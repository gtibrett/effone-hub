import { test, expect } from '@playwright/test';
import { CIRCUITS_2025 } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';
import { selectSeason } from '../fixtures/season-select';

/**
 * §11.1 — Circuits list filter: name/place, season, no-match, clear (no network).
 *
 * Key invariants from the plan:
 * - Season filter defaults to current season; set '2025' explicitly.
 * - #circuits-search-filter matches name + placeName only (country is an object,
 *   not a usable text field).
 * - Freeform filter is OR/union across space-split tokens (broadens, not narrows).
 * - All filtering is client-side — no /graphql request must fire.
 * - MUI Data Grid virtualizes rows; count via aria-rowcount, not DOM row count.
 */

test.describe('§11.1 Circuits list filter', () => {
	test('step 1 — Season=2025 shows 2025 circuits, no GraphQL', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/circuits');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#circuits-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		// Default season is current season, not 2025 — set explicitly
		await selectSeason(page, 'circuits-season-filter', 2025);

		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		expectNoGraphql(gql);

		// Grid must be visible
		const grid = page.locator('[role="grid"]');
		await expect(grid).toBeVisible({ timeout: 10_000 });

		// aria-rowcount reflects total rows (virtualised grid exposes this)
		const rowCount = await grid.getAttribute('aria-rowcount');
		const count2025 = rowCount ? Math.max(0, parseInt(rowCount, 10) - 1) : 0;

		// Sanity: 2025 has 24 circuits
		expect(count2025).toBe(CIRCUITS_2025.length);
	});

	test('step 2 — name fragment narrows grid, no GraphQL', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/circuits');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#circuits-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		await selectSeason(page, 'circuits-season-filter', 2025);
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		const grid = page.locator('[role="grid"]');
		const rowCountBefore = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);
		expect(rowCountBefore).toBeGreaterThan(1);

		// "monaco" matches Monaco circuit by name
		const searchInput = page.locator('#circuits-search-filter');
		await expect(searchInput).toBeVisible();
		await searchInput.fill('monaco');

		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		expectNoGraphql(gql);

		const rowCountAfter = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);

		// Must narrow to at least one match
		expect(rowCountAfter).toBeGreaterThanOrEqual(1);
		// Must be fewer than the unfiltered 2025 set
		expect(rowCountAfter).toBeLessThan(rowCountBefore);
	});

	test('step 2b — placeName fragment narrows grid, no GraphQL', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/circuits');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#circuits-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		await selectSeason(page, 'circuits-season-filter', 2025);
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		const grid = page.locator('[role="grid"]');
		const rowCountBefore = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);
		expect(rowCountBefore).toBeGreaterThan(1);

		// "Melbourne" is the placeName for the Albert Park circuit
		const searchInput = page.locator('#circuits-search-filter');
		await searchInput.fill('Melbourne');

		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		expectNoGraphql(gql);

		const rowCountAfter = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);

		expect(rowCountAfter).toBeGreaterThanOrEqual(1);
		expect(rowCountAfter).toBeLessThan(rowCountBefore);
	});

	test('step 3 — multi-token OR union broadens result, no GraphQL', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/circuits');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#circuits-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		await selectSeason(page, 'circuits-season-filter', 2025);
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		const grid = page.locator('[role="grid"]');

		// Single-token baselines
		const searchInput = page.locator('#circuits-search-filter');

		await searchInput.fill('grand');
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);
		const countGrand = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);

		await searchInput.fill('monaco');
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);
		const countMonaco = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);

		// Multi-token OR query: each token matched independently, results are unioned
		await searchInput.fill('grand monaco');
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);
		const countUnion = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);

		expectNoGraphql(gql);

		// Union must be at least as large as the larger single-token set
		expect(countUnion).toBeGreaterThanOrEqual(Math.max(countGrand, countMonaco));
		// And typically larger than each individually (OR semantics, not AND)
		expect(countUnion).toBeGreaterThanOrEqual(1);
	});

	test('step 4 — clear search restores full Season=2025 set, no GraphQL', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/circuits');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#circuits-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		await selectSeason(page, 'circuits-season-filter', 2025);
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		const grid = page.locator('[role="grid"]');
		const countFull = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);

		// Apply a filter
		const searchInput = page.locator('#circuits-search-filter');
		await searchInput.fill('monaco');
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		// Clear the filter
		await searchInput.fill('');
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		expectNoGraphql(gql);

		const countRestored = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);

		// Full 2025 set should be restored
		expect(countRestored).toBe(countFull);
		expect(countRestored).toBe(CIRCUITS_2025.length);
	});

	test('step 5a — no-match query yields zero rows, no GraphQL', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/circuits');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#circuits-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		await selectSeason(page, 'circuits-season-filter', 2025);
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		const searchInput = page.locator('#circuits-search-filter');
		await searchInput.fill('zzzzz');
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		expectNoGraphql(gql);

		const grid = page.locator('[role="grid"]');
		const rowCount = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);

		expect(rowCount).toBe(0);
	});

	test('step 5b — Season=Any after no-match shows full all-time list, no GraphQL', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/circuits');
		// Wait for filter to be interactive — don't use networkidle (too slow under load)
		await page.locator('#circuits-season-filter').waitFor({ state: 'visible', timeout: 30_000 });

		// Start in a no-match state with Season=2025
		await selectSeason(page, 'circuits-season-filter', 2025);
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		const searchInput = page.locator('#circuits-search-filter');
		await searchInput.fill('zzzzz');
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		const grid = page.locator('[role="grid"]');
		const zeroCount = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);
		expect(zeroCount).toBe(0);

		// Clear the no-match search and switch to Any
		await searchInput.fill('');
		await selectSeason(page, 'circuits-season-filter', 'Any');
		await page.getByRole('button', { name: /search/i }).click();
		// Brief settle for client-side filter to update the grid
		await page.waitForTimeout(500);

		expectNoGraphql(gql);

		const allTimeCount = Math.max(0, parseInt((await grid.getAttribute('aria-rowcount')) ?? '1', 10) - 1);

		// All-time list must be larger than the 2025 set (24 circuits)
		expect(allTimeCount).toBeGreaterThan(CIRCUITS_2025.length);
	});
});
