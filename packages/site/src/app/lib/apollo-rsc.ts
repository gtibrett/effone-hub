import 'server-only';

import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient
} from '@apollo/client-integration-nextjs';

import { createServerGrafastLink } from './server-graphql';

/**
 * Server Apollo client — executes PostGraphile in-process via grafast (no
 * HTTP, no running Next server). Used by every server-side GraphQL caller:
 * RSC, SSR, generateStaticParams, generateMetadata. The browser uses the
 * HttpLink client in apollo-make-client.ts.
 */
export const { getClient } = registerApolloClient(
	() =>
		new ApolloClient({
			// No typePolicies: server does one-shot build/SSR reads, not
			// cross-component normalization. Compound types (no single `id`) store
			// inline under their parent — avoids keyFields-completeness throws on
			// queries that don't select every key field (e.g. param-gen queries).
			cache: new InMemoryCache(),
			link: createServerGrafastLink()
		})
);
