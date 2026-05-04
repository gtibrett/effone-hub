import {ApolloLink, HttpLink} from '@apollo/client';
import {ApolloClient, InMemoryCache, SSRMultipartLink} from '@apollo/experimental-nextjs-app-support';

export function makeClient() {
	const httpLink = new HttpLink({
		uri:         process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
		fetchOptions: {
			cache: 'force-cache'
		}
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link:  typeof window === 'undefined'
			? ApolloLink.from([
				new SSRMultipartLink({stripDefer: true}),
				httpLink
			])
			: httpLink
	});
}
