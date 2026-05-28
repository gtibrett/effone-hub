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
 * Schema is built once per process and memoized; the pg pool comes from
 * the preset's pgService and is reused across calls.
 */

type SchemaResult = Awaited<ReturnType<ReturnType<typeof postgraphile>['getSchemaResult']>>;

let pgl: ReturnType<typeof postgraphile> | undefined;
let schemaResult: Promise<SchemaResult> | undefined;

function getSchemaResult(): Promise<SchemaResult> {
	pgl ??= postgraphile(preset);
	schemaResult ??= Promise.resolve(pgl.getSchemaResult());
	return schemaResult;
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
