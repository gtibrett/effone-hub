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

async function main() {
	const app = Fastify({ logger: true });

	// Public read-only API (mutations disabled at schema build). Reflect any
	// origin — a fixed allowlist would 403 every per-deploy Vercel preview host.
	await app.register(cors, { origin: true });

	app.get('/health', async () => ({ status: 'ok' }));

	const serv = getPostgraphile().createServ(grafserv);
	await serv.addTo(app);

	await app.listen({ port: PORT, host: HOST });
}

main().catch((err: unknown) => {
	console.error(err);
	process.exit(1);
});
