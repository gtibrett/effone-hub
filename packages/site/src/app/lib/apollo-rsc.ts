import 'server-only';

import { HttpLink } from '@apollo/client';
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient
} from '@apollo/client-integration-nextjs';

const LOCAL_API_URL = 'http://localhost:4000/graphql';

// The api is a SEPARATE origin (own Vercel project) so the URL must be
// absolute. Fall back to the local dev api; on Vercel the env var is required —
// a localhost fallback in prod would be a baffling silent failure.
function resolveApiUrl(): string {
	const url = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
	if (url) return url;
	if (process.env.VERCEL) {
		throw new Error(
			'NEXT_PUBLIC_GRAPHQL_API_URL is required on Vercel (the standalone GraphQL api URL).'
		);
	}
	return LOCAL_API_URL;
}

// api preview deployments are SSO-gated, so server-side (RSC / build-time)
// fetches need the x-vercel-protection-bypass header. Wrap fetch to add it
// per-request (reads env at call time, not at link construction).
const serverFetch: typeof fetch = (input, init) => {
	const headers = new Headers(init?.headers);
	const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
	if (bypass) headers.set('x-vercel-protection-bypass', bypass);
	return fetch(input, { ...init, headers });
};

/**
 * Server Apollo client — talks to the standalone GraphQL api over HTTP (RSC,
 * SSR, generateStaticParams, generateMetadata). The browser uses the HttpLink
 * client in apollo-make-client.ts.
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
			link: new HttpLink({ uri: resolveApiUrl(), fetch: serverFetch })
		})
);
