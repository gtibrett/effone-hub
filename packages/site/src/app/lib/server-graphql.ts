import 'server-only';

import { print } from 'graphql';
import { postgraphile } from 'postgraphile';
import { grafast } from 'postgraphile/grafast';
import { ApolloLink, type FetchResult, Observable } from '@apollo/client';

import preset from '../../../graphile.config';

/**
 * In-process PostGraphile execution for server-side GraphQL (build-time
 * generateStaticParams / generateMetadata, RSC, SSR). Runs the SAME
 * schema + resolvers as the /api/graphql HTTP endpoint via grafast, so no
 * Next server has to be listening — fixes the build-time gap that
 * previously forced raw SQL.
 *
 * Schema is built once per PROCESS and cached on globalThis. Module-scoped
 * memoization is NOT enough: Next dev (webpack HMR) re-evaluates server
 * modules across recompiles, so a `let` cache rebuilds the full f1db schema
 * each time — those builds accumulate and the process gets OOM-killed (137).
 * Pinning to globalThis survives HMR module re-instantiation → exactly one
 * schema + one pg pool for the process lifetime.
 */

type SchemaResult = Awaited<ReturnType<ReturnType<typeof postgraphile>['getSchemaResult']>>;

const GLOBAL_KEY = Symbol.for('effone.serverGrafast');
type GlobalCache = { schemaResult?: Promise<SchemaResult> };
// biome-ignore lint/suspicious/noExplicitAny: generic
const globalCache: GlobalCache = ((globalThis as any)[GLOBAL_KEY] ??= {});

const REQUIRED_ROOT_FIELDS = ['seasons', 'drivers', 'teams', 'circuits'] as const;

// Fail fast on an empty/wrong-schema introspection (e.g. POSTGRES_SCHEMA pointed
// at a schema with no f1db tables). Without this every query just errors and the
// callers' fallbacks would mask it — silent blank site, green build.
function assertSchemaPopulated(schema: SchemaResult['schema']): void {
	const fields = schema.getQueryType()?.getFields() ?? {};
	const missing = REQUIRED_ROOT_FIELDS.filter(f => !(f in fields));
	if (missing.length) {
		throw new Error(
			`PostGraphile introspected an unexpected schema: missing root field(s) ${missing.join(', ')}. Check POSTGRES_SCHEMA (expected f1db,app).`
		);
	}
}

function getSchemaResult(): Promise<SchemaResult> {
	// Reset cache on rejection: a cold-start DB blip must not pin a rejected promise
	// for the process lifetime (every later query would then fail).
	globalCache.schemaResult ??= Promise.resolve(postgraphile(preset).getSchemaResult())
		.then(result => {
			assertSchemaPopulated(result.schema);
			return result;
		})
		.catch((err: unknown) => {
			globalCache.schemaResult = undefined;
			throw err;
		});
	return globalCache.schemaResult;
}

export function createServerGrafastLink(): ApolloLink {
	return new ApolloLink(
		operation =>
			new Observable<FetchResult>(observer => {
				getSchemaResult()
					.then(({ schema, resolvedPreset }) =>
						// `grafast` (not `grafastGraphql`) runs hookArgs so the preset's
						// pgService injects `withPgClient` into the GraphQL context.
						// `requestContext` (NOT `contextValue`) is the hook input.
						grafast({
							schema,
							resolvedPreset,
							requestContext: {},
							source: print(operation.query),
							variableValues: operation.variables,
							operationName: operation.operationName ?? undefined
						})
					)
					.then(result => {
						// Plain queries return a single ExecutionResult (never the
						// AsyncGenerator that incremental/@defer would produce).
						observer.next(result as FetchResult);
						observer.complete();
					})
					.catch((err: unknown) => observer.error(err));
			})
	);
}
