import 'dotenv/config';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import { postgraphile } from 'postgraphile';
import { grafserv } from 'postgraphile/grafserv/fastify/v5';

import preset from '../graphile.config';

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? '0.0.0.0';

// Build the heavy f1db schema once per process and reuse. Vercel Fluid reuses
// an instance across requests, so one PostGraphile instance + warm pg pool
// amortizes the build. Pinned to globalThis so a module re-eval (tsx watch,
// import dedupe) can't trigger a second build.
const GLOBAL_KEY = Symbol.for('effone.api.postgraphile');
type Cache = { instance?: ReturnType<typeof postgraphile> };
const cache: Cache = ((globalThis as Record<symbol, unknown>)[GLOBAL_KEY] ??= {}) as Cache;

function getPostgraphile() {
	return (cache.instance ??= postgraphile(preset));
}

type SchemaResult = Awaited<ReturnType<ReturnType<typeof postgraphile>['getSchemaResult']>>;

const REQUIRED_ROOT_FIELDS = ['seasons', 'drivers', 'teams', 'circuits'] as const;

// Fail fast on an empty/wrong-schema introspection (POSTGRES_SCHEMA pointed at a
// schema with no f1db tables). Otherwise every query errors at runtime — a
// silent blank site behind a green build. Ported from the former in-process
// server-graphql.ts when the site became a pure HTTP consumer.
function assertSchemaPopulated(schema: SchemaResult['schema']): void {
	const fields = schema.getQueryType()?.getFields() ?? {};
	const missing = REQUIRED_ROOT_FIELDS.filter(f => !(f in fields));
	if (missing.length) {
		throw new Error(
			`PostGraphile introspected an unexpected schema: missing root field(s) ${missing.join(', ')}. Check POSTGRES_SCHEMA (expected f1db,app).`
		);
	}
}

async function main() {
	const app = Fastify({ logger: true });

	// Public read-only API (mutations disabled at schema build). Reflect any
	// origin — a fixed allowlist would 403 every per-deploy Vercel preview host.
	await app.register(cors, { origin: true });

	app.get('/health', async () => ({ status: 'ok' }));

	const pgl = getPostgraphile();
	// Build + validate the schema at boot, not on first request: fail fast on a
	// bad DB / wrong schema and warm the first query. grafserv reuses this build.
	const { schema } = await pgl.getSchemaResult();
	assertSchemaPopulated(schema);

	const serv = pgl.createServ(grafserv);
	await serv.addTo(app);

	await app.listen({ port: PORT, host: HOST });
}

main().catch((err: unknown) => {
	console.error(err);
	process.exit(1);
});
