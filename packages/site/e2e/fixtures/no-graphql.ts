import { expect, type Page } from '@playwright/test';

/**
 * Start tracking browser GraphQL requests. The app is fully SSR/prerendered, so
 * the browser must never hit `/graphql`. Call BEFORE navigation, then pass the
 * returned array to {@link expectNoGraphql} after the page settles.
 */
export function trackGraphqlRequests(page: Page): string[] {
	const hits: string[] = [];
	page.on('request', req => {
		if (req.url().includes('/graphql')) {
			hits.push(req.url());
		}
	});
	return hits;
}

export function expectNoGraphql(hits: string[]): void {
	expect(hits, `expected zero browser GraphQL requests, saw: ${hits.join(', ')}`).toEqual([]);
}
