import 'server-only';

import type { DocumentNode, ExecutionResult } from 'graphql';
import { postgraphile } from 'postgraphile';
import { execute, hookArgs, isAsyncIterable } from 'postgraphile/grafast';
import { makePreset } from '@gtibrett/effone-hub-api/preset';

const LOCAL_POSTGRES_URL = 'postgres://postgres:effonehub@localhost:5432/postgres';

// The site executes GraphQL in-process (no standalone api deployment). Fall
// back to the local docker DB in dev; on Vercel the env var is required — a
// localhost fallback in prod would be a baffling silent failure.
function resolveConnectionString(): string {
	const url = process.env.POSTGRES_URL;
	if (url) return url;
	if (process.env.VERCEL) {
		throw new Error('POSTGRES_URL is required on Vercel (Neon pooled connection string).');
	}
	return LOCAL_POSTGRES_URL;
}

/**
 * In-process PostGraphile executor — replaces the HTTP hop to the standalone
 * api Vercel project. Same preset, same schema, same grafast execution as the
 * dev server; queries hit Postgres directly from this function instance.
 *
 * The heavy f1db schema builds once per process and is reused. Vercel Fluid
 * reuses an instance across requests, so one PostGraphile instance + warm pg
 * pool amortizes the build (introspection runs only on cold start). Pinned to
 * globalThis so a module re-eval (dev HMR, import dedupe) can't trigger a
 * second build / second pool.
 */
const GLOBAL_KEY = Symbol.for('effone.site.postgraphile');

type ExecutorState = {
	instance?: ReturnType<typeof postgraphile>;
};

const globalStore = globalThis as Record<symbol, unknown>;
const state: ExecutorState = (globalStore[GLOBAL_KEY] as ExecutorState | undefined) ?? {};
globalStore[GLOBAL_KEY] = state;

function getInstance() {
	if (!state.instance) {
		state.instance = postgraphile(
			makePreset({
				connectionString: resolveConnectionString(),
				schemas: process.env.POSTGRES_SCHEMA ?? 'f1db,app'
			})
		);
	}
	return state.instance;
}

export async function executeDocument<TData = Record<string, unknown>>(
	document: DocumentNode,
	variableValues?: Record<string, unknown>
): Promise<ExecutionResult<TData>> {
	const pgl = getInstance();
	const [schema, resolvedPreset] = await Promise.all([pgl.getSchema(), pgl.getResolvedPreset()]);
	// hookArgs applies the preset's context hooks (pg pool / withPgClient) the
	// same way grafserv would for an HTTP request.
	const args = await hookArgs({
		schema,
		document,
		variableValues: variableValues ?? null,
		resolvedPreset,
		requestContext: {}
	});
	const result = await execute(args);
	if (isAsyncIterable(result)) {
		// Queries here are one-shot reads; streamed results (@stream/@defer,
		// subscriptions) are never issued by the site.
		throw new Error('Unexpected streaming GraphQL result in in-process executor');
	}
	return result as ExecutionResult<TData>;
}
