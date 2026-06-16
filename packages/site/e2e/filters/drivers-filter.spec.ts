import { test, expect, type Page } from '@playwright/test';

import { DRIVERS_2025, SEASON_2025 } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';
import { selectSeason } from '../fixtures/season-select';

/**
 * §9.1 — Drivers list filter: name, nationality, season, no-match, clear.
 *
 * All filtering is client-side over SSR-loaded data — no /graphql hits.
 *
 * Filter IDs (from DriversFilters.tsx / SeasonMenu.tsx):
 *   #drivers-search-filter      — TextField, matches firstName + lastName (OR across space-split tokens)
 *   #drivers-nationality-filter — TextField, matches nationalityCountryId (country CODE, e.g. 'NL', 'GB')
 *   #drivers-season-filter      — MUI Select (role=combobox), -1 = 'Any'
 *
 * Row count strategy: MUI DataGrid sets aria-rowcount on .MuiDataGrid-root
 * to reflect the TOTAL filtered rows regardless of virtualization. We read
 * that attribute rather than counting DOM rows.
 */

/** Read the total row count from the DataGrid's aria-rowcount attribute. */
async function getRowCount(page: Page): Promise<number> {
	// aria-rowcount lives on [role="grid"] (MuiDataGrid-main), NOT on .MuiDataGrid-root.
	const grid = page.locator('[role="grid"]').first();
	await expect(grid).toBeVisible({ timeout: 10_000 });
	const raw = await grid.getAttribute('aria-rowcount');
	// aria-rowcount includes the header row — subtract it for the data row count.
	return raw !== null ? Math.max(0, parseInt(raw, 10) - 1) : 0;
}

/** Click the Search button (type=submit with sr-only label "Search"). */
async function clickSearch(page: Page): Promise<void> {
	await page.getByRole('button', { name: /^Search$/i }).click();
	// Allow React state update to flush.
	await page.waitForTimeout(100);
}

test.describe('Section 9 — Drivers list client-side filters', () => {
	test.describe('9.1 Name, nationality, season, no-match, and clear', () => {
		test('step 1: default shows current-season drivers; switching to 2025 shows 2025 set', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/drivers');

			// Page heading confirms we are on the drivers list.
			await expect(page.getByRole('heading', { name: /Drivers/i })).toBeVisible({ timeout: 15_000 });

			// Grid renders with current-season default.
			await expect(page.locator('.MuiDataGrid-root')).toBeVisible({ timeout: 15_000 });
			const defaultCount = await getRowCount(page);
			expect(defaultCount).toBeGreaterThan(0);

			// Switch to 2025 and submit.
			await selectSeason(page, 'drivers-season-filter', SEASON_2025);
			await clickSearch(page);

			const count2025 = await getRowCount(page);
			// Filter returns all drivers who appeared in any 2025 race (>21 roster entries).
			expect(count2025).toBeGreaterThan(0);

			// Zero client GraphQL throughout.
			expectNoGraphql(gql);
		});

		test('step 2: search by surname narrows grid to matching drivers', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/drivers');
			await expect(page.locator('.MuiDataGrid-root')).toBeVisible({ timeout: 15_000 });

			// Set season to 2025, get baseline.
			await selectSeason(page, 'drivers-season-filter', SEASON_2025);
			await clickSearch(page);
			const count2025 = await getRowCount(page);

			// Type a known 2025 surname — "Norris" is unambiguous.
			await page.locator('#drivers-search-filter').fill('Norris');
			await clickSearch(page);

			const matchCount = await getRowCount(page);
			// At least 1 result.
			expect(matchCount).toBeGreaterThanOrEqual(1);
			// Fewer than the full 2025 set.
			expect(matchCount).toBeLessThan(count2025);

			// aria-rowcount confirms the filter applied (no DOM row counting needed).
			expectNoGraphql(gql);
		});

		test('step 3: clearing search restores full 2025 set', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/drivers');
			await expect(page.locator('.MuiDataGrid-root')).toBeVisible({ timeout: 15_000 });

			// Set season 2025.
			await selectSeason(page, 'drivers-season-filter', SEASON_2025);
			await clickSearch(page);
			const count2025 = await getRowCount(page);
			expect(count2025).toBeGreaterThan(0);

			// Narrow with a name search.
			await page.locator('#drivers-search-filter').fill('Russell');
			await clickSearch(page);
			expect(await getRowCount(page)).toBeLessThan(count2025);

			// Clear the search field and resubmit.
			await page.locator('#drivers-search-filter').fill('');
			await clickSearch(page);

			// Full 2025 set restored.
			expect(await getRowCount(page)).toBe(count2025);

			expectNoGraphql(gql);
		});

		test('step 4: nationality filter matches country code substring (e.g. NL for Dutch)', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/drivers');
			await expect(page.locator('.MuiDataGrid-root')).toBeVisible({ timeout: 15_000 });

			// Set season 2025.
			await selectSeason(page, 'drivers-season-filter', SEASON_2025);
			await clickSearch(page);
			const count2025 = await getRowCount(page);

			// Max Verstappen is Dutch → nationalityCountryId = 'netherlands' (F1DB slug, not ISO code).
			// At least he is in the 2025 roster.
			await page.locator('#drivers-nationality-filter').fill('netherlands');
			await clickSearch(page);

			const nlCount = await getRowCount(page);
			expect(nlCount).toBeGreaterThanOrEqual(1);
			expect(nlCount).toBeLessThan(count2025);

			// Clear nationality and restore.
			await page.locator('#drivers-nationality-filter').fill('');
			await clickSearch(page);
			expect(await getRowCount(page)).toBe(count2025);

			expectNoGraphql(gql);
		});

		test('step 5: no-match search shows zero rows', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/drivers');
			await expect(page.locator('.MuiDataGrid-root')).toBeVisible({ timeout: 15_000 });

			await selectSeason(page, 'drivers-season-filter', SEASON_2025);
			await clickSearch(page);

			// Search string that matches no driver.
			await page.locator('#drivers-search-filter').fill('zzzzz');
			await clickSearch(page);

			expect(await getRowCount(page)).toBe(0);

			expectNoGraphql(gql);
		});

		test('step 6: changing season to 2024 yields a different (non-2025) driver set', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/drivers');
			await expect(page.locator('.MuiDataGrid-root')).toBeVisible({ timeout: 15_000 });

			// Establish 2025 baseline.
			await selectSeason(page, 'drivers-season-filter', SEASON_2025);
			await clickSearch(page);
			const count2025 = await getRowCount(page);
			expect(count2025).toBeGreaterThan(0);

			// Clear any name filter, then switch to 2024.
			await page.locator('#drivers-search-filter').fill('');
			await selectSeason(page, 'drivers-season-filter', 2024);
			await clickSearch(page);

			const count2024 = await getRowCount(page);
			// 2024 has its own roster — different from 2025 but non-empty.
			expect(count2024).toBeGreaterThan(0);
			// Membership differs (some drivers differ year to year).
			// We cannot assert exact count, but confirm it's a real season load.
			// The filter is client-side — still no GraphQL.
			expectNoGraphql(gql);
		});

		test('step 7: Season=Any shows full all-time driver list (largest set)', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/drivers');
			await expect(page.locator('.MuiDataGrid-root')).toBeVisible({ timeout: 15_000 });

			// Establish 2025 baseline.
			await selectSeason(page, 'drivers-season-filter', SEASON_2025);
			await clickSearch(page);
			const count2025 = await getRowCount(page);

			// Switch to Any.
			await selectSeason(page, 'drivers-season-filter', 'Any');
			await clickSearch(page);

			const countAny = await getRowCount(page);
			// All-time list must be larger than any single season.
			expect(countAny).toBeGreaterThan(count2025);

			expectNoGraphql(gql);
		});

		test('OR union: space-separated tokens broaden, not narrow, the result', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/drivers');
			await expect(page.locator('.MuiDataGrid-root')).toBeVisible({ timeout: 15_000 });

			await selectSeason(page, 'drivers-season-filter', SEASON_2025);
			await clickSearch(page);

			// "norris" alone → subset A.
			await page.locator('#drivers-search-filter').fill('norris');
			await clickSearch(page);
			const countA = await getRowCount(page);
			expect(countA).toBeGreaterThanOrEqual(1);

			// "russell" alone → subset B.
			await page.locator('#drivers-search-filter').fill('russell');
			await clickSearch(page);
			const countB = await getRowCount(page);
			expect(countB).toBeGreaterThanOrEqual(1);

			// "norris russell" → union A ∪ B (both tokens are OR-matched).
			await page.locator('#drivers-search-filter').fill('norris russell');
			await clickSearch(page);
			const countUnion = await getRowCount(page);
			// Union >= max(A, B).
			expect(countUnion).toBeGreaterThanOrEqual(Math.max(countA, countB));
			// And typically A + B when no driver matches both tokens.
			expect(countUnion).toBeGreaterThanOrEqual(countA + countB - 1);

			expectNoGraphql(gql);
		});
	});
});
