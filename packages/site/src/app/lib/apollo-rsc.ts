import 'server-only';

import { from } from 'rxjs';
import { ApolloLink } from '@apollo/client';
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient
} from '@apollo/client-integration-nextjs';

import { executeDocument } from './graphql-executor';

// GraphQL executes IN-PROCESS via grafast against the shared PostGraphile
// schema (graphql-executor.ts) — no HTTP hop, no standalone api deployment.
// Each operation resolves to a single Observable emission, mirroring what an
// HttpLink would deliver for a one-shot query.
const inProcessLink = new ApolloLink(operation =>
	from(
		executeDocument(operation.query, operation.variables).then(
			({ data, errors, extensions }) => ({
				// ExecutionResult.data is optional; Apollo's Result wants the key present.
				data: data ?? null,
				...(errors?.length ? { errors } : {}),
				...(extensions ? { extensions } : {})
			})
		)
	)
);

/**
 * Server Apollo client — executes against the PostGraphile schema in-process
 * (RSC, SSR, generateStaticParams, generateMetadata). There is no browser
 * GraphQL client; all data flows through cached-data.ts fetchers.
 */
export const { getClient } = registerApolloClient(
	() =>
		new ApolloClient({
			// Minimal typePolicies (only the merge fields below): server does
			// one-shot SSR/build reads, not
			// cross-component normalization. Compound types (no single `id`) store
			// inline under their parent — avoids keyFields-completeness throws on
			// queries that don't select every key field (e.g. param-gen queries).
			cache: new InMemoryCache({
				typePolicies: {
					Query: {
						fields: {
							// Within one SSR render, multiple components read the same root
							// field (same args) with DIFFERENT sub-selections. These compound
							// types store inline (no keyFields), so the second write would
							// replace the first and drop fields ("Cache data may be lost").
							// merge:true unions the selections per storage key instead.
							season: { merge: true },
							raceByYearAndRound: { merge: true }
						}
					}
				}
			}),
			link: inProcessLink
		})
);
