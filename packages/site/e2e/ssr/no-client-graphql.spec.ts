import { test, expect } from '@playwright/test';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

/**
 * Routes under test. Each entry: the path to navigate and the expected <title>
 * text (substring match, case-insensitive). The full document title pattern is
 * "<Page> | effOne Hub" for section pages and "effOne Hub" for the root.
 */
const ROUTES: Array<{ path: string; titleSubstring: string; contentSelector: string }> = [
	{
		path: '/',
		titleSubstring: 'effOne Hub',
		// Home: Driver's Standings ChartSwitcher heading
		contentSelector: 'main',
	},
	{
		path: '/2025',
		titleSubstring: '2025',
		contentSelector: 'main',
	},
	{
		path: '/2025/1',
		titleSubstring: '2025',
		contentSelector: 'main',
	},
	{
		path: '/drivers',
		titleSubstring: 'Drivers',
		contentSelector: 'main',
	},
	{
		path: '/constructors',
		titleSubstring: 'Constructors',
		contentSelector: 'main',
	},
	{
		path: '/circuits',
		titleSubstring: 'Circuits',
		contentSelector: 'main',
	},
	{
		path: '/seasons',
		titleSubstring: 'Past Seasons',
		contentSelector: 'main',
	},
	{
		path: '/about',
		titleSubstring: 'About',
		contentSelector: 'main',
	},
];

/**
 * Console messages at error level that we explicitly allow — Next.js dev-mode
 * hydration warnings that are framework noise rather than app bugs.
 * Everything else at "error" level fails the test.
 */
const ALLOWED_ERROR_PATTERNS: RegExp[] = [
	// Next.js dev overlay injection noise
	/__webpack_require__/,
];

/**
 * Known-bad error substrings from the plan's invariant list. If any console
 * error matches one of these the test fails explicitly with the matched text.
 */
const FORBIDDEN_ERROR_SUBSTRINGS = [
	'ChartsContainer has no width',
	'is not iterable',
	'scaleBand',
	'Cache data may be lost',
];

test.describe('Section 1 — Global SSR + No-GraphQL Invariant', () => {
	test.describe('1.1 Every primary route renders server-side with zero browser GraphQL', () => {
		for (const route of ROUTES) {
			test(`route ${route.path} — no /graphql requests, visible content, correct title`, async ({
				page,
			}) => {
				// Must attach BEFORE navigation
				const gql = trackGraphqlRequests(page);

				// Use default waitUntil (load) instead of networkidle — networkidle
				// blocks on JS chunks and can take 30s+ under parallel dev-server load.
				await page.goto(route.path);

				// Primary content visible — no error boundary, no infinite skeleton.
				// 30s timeout: dev SSR render can be slow under parallel load.
				const main = page.locator(route.contentSelector);
				await expect(main).toBeVisible({ timeout: 30_000 });

				// Title contains expected substring (case-insensitive)
				const title = await page.title();
				expect(
					title.toLowerCase(),
					`expected title to contain "${route.titleSubstring}" (got "${title}")`
				).toContain(route.titleSubstring.toLowerCase());

				// Zero client-side GraphQL requests
				expectNoGraphql(gql);
			});
		}
	});

	test.describe('1.2 No uncaught console errors on any primary route', () => {
		for (const route of ROUTES) {
			test(`route ${route.path} — no console errors or known bad warnings`, async ({ page }) => {
				const consoleErrors: string[] = [];

				page.on('console', msg => {
					if (msg.type() !== 'error') return;
					const text = msg.text();
					// Skip framework noise
					if (ALLOWED_ERROR_PATTERNS.some(re => re.test(text))) return;
					consoleErrors.push(text);
				});

				page.on('pageerror', err => {
					consoleErrors.push(`[pageerror] ${err.message}`);
				});

				// Use default waitUntil (load) instead of networkidle
				await page.goto(route.path);

				// Wait for main to be visible to ensure page has rendered
				await expect(page.locator('main')).toBeVisible({ timeout: 30_000 });

				// Explicitly flag known-bad patterns from the invariant list
				for (const bad of FORBIDDEN_ERROR_SUBSTRINGS) {
					const hit = consoleErrors.find(e => e.includes(bad));
					expect(
						hit,
						`Forbidden console error on ${route.path}: "${bad}" — saw: ${hit}`
					).toBeUndefined();
				}

				// No uncaught errors at all
				expect(
					consoleErrors,
					`Unexpected console errors on ${route.path}`
				).toHaveLength(0);
			});
		}
	});
});
