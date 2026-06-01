import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

import { typePolicies } from './apollo-type-policies';

/**
 * Browser Apollo client — talks to the standalone GraphQL api over HTTP. Server
 * rendering uses apollo-rsc.ts (also HTTP, plus the preview-bypass header).
 */
export function makeClient() {
	return new ApolloClient({
		cache: new InMemoryCache({ typePolicies }),
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? 'http://localhost:4000/graphql'
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
