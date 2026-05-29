import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

import { typePolicies } from './apollo-type-policies';

/**
 * Browser Apollo client — talks to the /api/graphql HTTP endpoint. Server
 * rendering uses the in-process grafast client in apollo-rsc.ts instead.
 */
export function makeClient() {
	return new ApolloClient({
		cache: new InMemoryCache({ typePolicies }),
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? '/api/graphql',
			fetchOptions: { cache: 'force-cache' }
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
