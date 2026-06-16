import { test, expect } from '@playwright/test';
import { CONSTRUCTORS_2025 } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';
import { selectSeason } from '../fixtures/season-select';

/**
 * §10.1 — Constructors list filter: name, season, no-match, clear (no network).
 *
 * The constructors list page (/constructors) is fully SSR; all rows are loaded
 * on the server. The search/filter is client-side only — no browser GraphQL
 * request should fire at any point. The season filter defaults to the current
 * season (not "Any"), so we always set it to 2025 explicitly.
 *
 * Filter IDs (confirmed from component source):
 *   #constructors-search-filter   — freeform name substring (OR across space-split tokens)
 *   #constructors-season-filter   — MUI Select (role=combobox), value 2025 or -1 for "Any"
 *
 * MUI Data Grid virtualizes rows; we rely on aria-rowcount for total counts
 * and visible cell text for match assertions rather than assuming all rows are
 * in the DOM.
 */

import type { Page } from '@playwright/test';

/** Read the data-grid's aria-rowcount (excludes header row). */
async function getGridRowCount(page: Page): Promise<number> {
	// MUI Data Grid sets aria-rowcount on the grid root element.
	const grid = page.locator('[role="grid"]').first();
	await grid.waitFor({ state: 'visible', timeout: 10_000 });
	const raw = await grid.getAttribute('aria-rowcount');
	// aria-rowcount includes the header row — subtract it for the data row count.
	return raw !== null ? Math.max(0, parseInt(raw, 10) - 1) : -1;
}

/** Select the season filter value and click the Search button. */
async function setSeason(page: Page, year: number | 'Any') {
	await selectSeason(page, 'constructors-season-filter', year);
	// Submit by clicking the magnifying-glass Search button (aria-label "Search").
	await page.getByRole('button', { name: /search/i }).click();
}

/** Fill the freeform name filter and submit. Pass '' to clear. */
async function setNameFilter(page: Page, value: string) {
	const input = page.locator('#constructors-search-filter');
	await input.fill(value);
	await page.getByRole('button', { name: /search/i }).click();
}

test.describe('§10.1 — Constructors list filter (client-side, no GraphQL)', () => {
	test('10.1.1 — season=2025 shows 2025 constructors; no GraphQL fired', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/constructors');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#constructors-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		// Season defaults to current season — set to 2025 explicitly.
		await setSeason(page, 2025);

		// Grid must be visible and show constructors.
		const grid = page.locator('[role="grid"]').first();
		await expect(grid).toBeVisible();

		// aria-rowcount should equal the 2025 constructor count (10).
		const count = await getGridRowCount(page);
		expect(count, 'expected 10 constructors in 2025').toBe(CONSTRUCTORS_2025.length);

		// Spot-check: at least one well-known team name is visible somewhere in the grid.
		await expect(page.getByRole('gridcell').filter({ hasText: /mclaren/i }).first()).toBeVisible();

		expectNoGraphql(gql);
	});

	test('10.1.2 — name filter narrows to matching constructors; no GraphQL fired', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/constructors');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#constructors-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		await setSeason(page, 2025);

		// Record full 2025 count before filtering.
		const countBefore = await getGridRowCount(page);
		expect(countBefore).toBe(CONSTRUCTORS_2025.length);

		// Filter by a known 2025 team name fragment ("red" matches "Red Bull").
		await setNameFilter(page, 'red');

		const countAfter = await getGridRowCount(page);
		// Should narrow to a smaller subset (>= 1).
		expect(countAfter, 'filter "red" should narrow the constructor list').toBeGreaterThanOrEqual(1);
		expect(countAfter, 'filter "red" should show fewer rows than the full 2025 set').toBeLessThan(countBefore);

		// The visible cells must contain "red" (case-insensitive).
		const cells = await page.getByRole('gridcell').allTextContents();
		const matchingCells = cells.filter(t => t.toLowerCase().includes('red'));
		expect(matchingCells.length, 'at least one visible cell must contain "red"').toBeGreaterThanOrEqual(1);

		expectNoGraphql(gql);
	});

	test('10.1.3 — clearing name filter restores full 2025 set; no GraphQL fired', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/constructors');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#constructors-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		await setSeason(page, 2025);

		// Apply a filter, then clear it.
		await setNameFilter(page, 'ferrari');

		const countFiltered = await getGridRowCount(page);
		expect(countFiltered).toBeGreaterThanOrEqual(1);

		// Clear the name filter.
		await setNameFilter(page, '');

		// Should restore to the full 2025 set.
		const countRestored = await getGridRowCount(page);
		expect(countRestored, 'clearing name filter should restore full 2025 set').toBe(CONSTRUCTORS_2025.length);

		expectNoGraphql(gql);
	});

	test('10.1.4 — no-match query shows zero rows; no GraphQL fired', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/constructors');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#constructors-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		await setSeason(page, 2025);

		// Type a string that cannot match any constructor name.
		await setNameFilter(page, 'zzzzz');

		const count = await getGridRowCount(page);
		expect(count, 'no-match query should yield zero rows').toBe(0);

		expectNoGraphql(gql);
	});

	test('10.1.5 — season=Any shows full all-time constructor list; no GraphQL fired', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/constructors');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#constructors-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		// First set to 2025 to establish the 2025 baseline.
		await setSeason(page, 2025);
		const count2025 = await getGridRowCount(page);
		expect(count2025).toBe(CONSTRUCTORS_2025.length);

		// Switch to Any — should include all-time constructors (many more than 10).
		await setSeason(page, 'Any');

		const countAll = await getGridRowCount(page);
		expect(countAll, '"Any" season should show more constructors than the 2025 set').toBeGreaterThan(count2025);

		expectNoGraphql(gql);
	});

	// Data-driven: each 2025 constructor ref must appear in the 2025-filtered grid.
	// The MUI Data Grid virtualizes rows, so we check aria-rowcount == 10 (above)
	// and spot-check each constructor via a targeted name filter.
	test.describe('per-constructor visibility (Season=2025)', () => {
		for (const ref of CONSTRUCTORS_2025) {
			// Derive a display-name fragment from the ref slug (hyphens → spaces).
			const nameFragment = ref.replace(/-/g, ' ');

			test(`constructor ${ref} appears when filtering by "${nameFragment}"`, async ({ page }) => {
				const gql = trackGraphqlRequests(page);

				await page.goto('/constructors');
				// Wait for filter to be interactive — don't use networkidle (too slow under load)
				await page.locator('#constructors-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

				await setSeason(page, 2025);

				// Filter by the first word of the name fragment (most unique part).
				const firstToken = nameFragment.split(' ')[0];
				await setNameFilter(page, firstToken);

				const count = await getGridRowCount(page);
				expect(count, `filtering "${firstToken}" must yield ≥1 row for ${ref}`).toBeGreaterThanOrEqual(1);

				expectNoGraphql(gql);
			});
		}
	});
});
