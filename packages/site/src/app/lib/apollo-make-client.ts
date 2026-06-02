import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

import { typePolicies } from './apollo-type-policies';

const LOCAL_API_URL = 'http://localhost:4000/graphql';

// The api is a separate origin so the URL must be absolute. NEXT_PUBLIC_* is
// baked at build time — fall back to the local dev api only in development; a
// missing var in a production build must fail loudly, not ship a localhost URL
// baked into the client bundle. (NODE_ENV, not VERCEL: VERCEL isn't inlined
// client-side; apollo-rsc.ts can use VERCEL because it's server-only.)
function resolveApiUrl(): string {
	const url = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
	if (url) return url;
	if (process.env.NODE_ENV === 'production') {
		throw new Error(
			'NEXT_PUBLIC_GRAPHQL_API_URL is required in production (the standalone GraphQL api URL).'
		);
	}
	return LOCAL_API_URL;
}

/**
 * Browser Apollo client — talks to the standalone GraphQL api over HTTP. Server
 * rendering uses apollo-rsc.ts (also HTTP, plus the preview-bypass header).
 */
export function makeClient() {
	return new ApolloClient({
		cache: new InMemoryCache({ typePolicies }),
		link: new HttpLink({
			uri: resolveApiUrl()
		}),
		defaultOptions: {
			// v4 flipped watchQuery's notifyOnNetworkStatusChange default to
			// true, emitting an extra "loading" render on every refetch. Shared
			// cache reads across sibling components on the driver page then
			// re-fire the underlying queries — a constant /api/graphql loop on
			// the Career tab. Restoring the v3 default ends the loop.
			watchQuery: { notifyOnNetworkStatusChange: false }
		}
	});
}
