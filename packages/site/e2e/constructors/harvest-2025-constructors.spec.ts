import { test, expect } from '@playwright/test';
import { CONSTRUCTORS_2025 } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';
import { selectSeason } from '../fixtures/season-select';

test.describe('§7.1 Harvest 2025 constructor ref list', () => {
	test('harvest via /constructors list page with Season=2025', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/constructors');

		// Set season filter to 2025 explicitly — page defaults to current season
		await selectSeason(page, 'constructors-season-filter', 2025);

		// Submit via the Search button
		await page.getByRole('button', { name: /search/i }).click();

		// Wait for grid to settle and first constructor link to appear
		await page.locator('a[href^="/constructors/"]').first().waitFor({ state: 'visible', timeout: 15_000 });

		expectNoGraphql(gql);

		// Collect all /constructors/<ref> hrefs visible in the grid
		const links = page.locator('a[href^="/constructors/"]');
		const hrefs = await links.evaluateAll(els =>
			(els as HTMLAnchorElement[]).map(a => a.getAttribute('href') ?? '')
		);

		// Extract refs from hrefs, de-duplicate
		const harvested = [
			...new Set(
				hrefs
					.map(h => h.match(/^\/constructors\/([^/?#]+)/)?.[1] ?? '')
					.filter(Boolean)
			)
		];

		expect(harvested.length).toBeGreaterThan(0);

		// Verified 2025 count: 10 constructors
		expect(harvested).toHaveLength(CONSTRUCTORS_2025.length);

		// Every ref from the fixture must appear in the harvested set
		for (const ref of CONSTRUCTORS_2025) {
			expect(harvested, `missing constructor ref: ${ref}`).toContain(ref);
		}
	});

	test('cross-check via /2025 Constructor Standings dialog', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/2025');
		// Open the "show full standings" dialog for Constructor Standings
		// Use text-based locator since ToggleButton accessible name may not resolve correctly with getByRole
		const showBtn = page
			.locator('button', { hasText: 'show full standings' })
			.nth(1); // second ChartSwitcher's button (constructor, after driver)
		// Wait for button to appear (replaces networkidle — networkidle takes 30s+ under load)
		await showBtn.waitFor({ state: 'visible', timeout: 30_000 });
		await showBtn.click();

		// Dialog should open
		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog.getByRole('heading')).toContainText('Constructor Standings');

		// Gather constructor links from dialog
		const links = dialog.locator('a[href^="/constructors/"]');
		await expect(links.first()).toBeVisible();

		const hrefs = await links.evaluateAll(els =>
			(els as HTMLAnchorElement[]).map(a => a.getAttribute('href') ?? '')
		);

		const harvested = [
			...new Set(
				hrefs
					.map(h => h.match(/^\/constructors\/([^/?#]+)/)?.[1] ?? '')
					.filter(Boolean)
			)
		];

		expect(harvested.length).toBeGreaterThan(0);
		expect(harvested).toHaveLength(CONSTRUCTORS_2025.length);

		expectNoGraphql(gql);
	});
});
