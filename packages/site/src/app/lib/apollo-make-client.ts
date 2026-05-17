import {HttpLink} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client-integration-nextjs';

/**
 * Resolve the GraphQL endpoint URI. Browser side, relative `/api/graphql`
 * works fine; server-side (RSC, generateMetadata, generateStaticParams) needs
 * an absolute URL because Node's fetch can't resolve same-origin paths.
 *
 * Order of resolution on the server:
 *   1. PUBLIC_GRAPHQL_API_URL env if it's already absolute
 *   2. https://${VERCEL_URL}${path} when running on Vercel
 *   3. http://localhost:3000${path} for local dev
 */
function resolveUri(): string {
	const configured = process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? '/api/graphql';
	if (typeof window !== 'undefined') return configured;
	if (configured.startsWith('http')) return configured;
	const host = process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: 'http://localhost:3000';
	return `${host}${configured.startsWith('/') ? '' : '/'}${configured}`;
}

export function makeClient() {
	// Custom fetch wrapper for server-side: preview deployments are SSO-gated,
	// so server-side fetches to the same deployment's /api/graphql need the
	// `x-vercel-protection-bypass` header. Wrapping fetch ensures the header
	// is added per-request (vs HttpLink's `headers` config which can be
	// captured at construction time and miss runtime env reads).
	const customFetch: typeof fetch = (input, init) => {
		const headers = new Headers(init?.headers);
		if (typeof window === 'undefined' && process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
			headers.set('x-vercel-protection-bypass', process.env.VERCEL_AUTOMATION_BYPASS_SECRET);
		}
		return fetch(input, {...init, headers});
	};

	const httpLink = new HttpLink({
		uri:          resolveUri(),
		fetch:        customFetch,
		fetchOptions: {
			cache: 'force-cache'
		}
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link:  httpLink
	});
}
