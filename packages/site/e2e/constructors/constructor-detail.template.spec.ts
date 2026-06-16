import { test, expect } from '@playwright/test';
import { REPRESENTATIVE_CONSTRUCTORS } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

/**
 * §7.2 Template suite: run once per 2025 constructor ref.
 * Constructor Tabs do NOT use a URL param — switching tabs must NOT change the URL.
 *
 * NOTE: The season tab label is "<current year> Season" (e.g. "2026 Season"),
 * not hard-coded to 2025, since the app always shows the latest active season.
 */

for (const ref of REPRESENTATIVE_CONSTRUCTORS) {
	test.describe(`constructor: ${ref}`, () => {
		test('page loads, header + tabs visible, no client GraphQL', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto(`/constructors/${ref}`);
			// Wait for tablist to appear — signals page has rendered (don't use networkidle)
			await expect(page.getByRole('tablist')).toBeVisible({ timeout: 30_000 });

			expectNoGraphql(gql);

			// Team name in an h2 (with flag)
			const heading = page.getByRole('heading', { level: 2 });
			await expect(heading).toBeVisible();

			// Tabs: History, Drivers, current-year Season
			const tablist = page.getByRole('tablist');
			await expect(tablist).toBeVisible();
			await expect(tablist.getByRole('tab', { name: /history/i })).toBeVisible();
			await expect(tablist.getByRole('tab', { name: /drivers/i })).toBeVisible();
			await expect(tablist.getByRole('tab', { name: /\d{4} season/i })).toBeVisible();

			// History tab is active by default
			await expect(tablist.getByRole('tab', { name: /history/i })).toHaveAttribute(
				'aria-selected',
				'true'
			);

			// Season Stats side card (Points / Podiums / Q head-to-head)
			const statsCard = page.getByText(/season stats/i).first();
			await expect(statsCard).toBeVisible();
		});

		test('History tab content renders without errors', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto(`/constructors/${ref}`);
			// Wait for tablist to appear — signals page has rendered (don't use networkidle)
			await expect(page.getByRole('tablist')).toBeVisible({ timeout: 30_000 });

			// History tab is default — no click needed
			// Charts/grids should render; verify the tab panel is present and visible
			const tabPanel = page.getByRole('tabpanel');
			await expect(tabPanel).toBeVisible();

			expectNoGraphql(gql);
		});

		test('Drivers tab renders without changing the URL', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto(`/constructors/${ref}`);
			// Wait for tablist to appear — signals page has rendered (don't use networkidle)
			await expect(page.getByRole('tablist')).toBeVisible({ timeout: 30_000 });

			const urlBefore = page.url();

			const driversTab = page.getByRole('tab', { name: /drivers/i });
			await driversTab.click();

			// Wait briefly for any potential navigation (there should be none)
			await page.waitForTimeout(300);

			// URL must NOT change — constructor tabs have no urlParam
			expect(page.url()).toBe(urlBefore);

			// Tab panel content rendered
			const tabPanel = page.getByRole('tabpanel');
			await expect(tabPanel).toBeVisible();

			// Drivers tab is now active
			await expect(driversTab).toHaveAttribute('aria-selected', 'true');

			expectNoGraphql(gql);
		});

		test('current-season Season tab renders without changing the URL', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto(`/constructors/${ref}`);
			// Wait for tablist to appear — signals page has rendered (don't use networkidle)
			await expect(page.getByRole('tablist')).toBeVisible({ timeout: 30_000 });

			const urlBefore = page.url();

			// Tab label is "<year> Season" — match dynamically
			const seasonTab = page.getByRole('tab', { name: /\d{4} season/i });
			await seasonTab.click();

			await page.waitForTimeout(300);

			// URL must NOT change
			expect(page.url()).toBe(urlBefore);

			const tabPanel = page.getByRole('tabpanel');
			await expect(tabPanel).toBeVisible();

			await expect(seasonTab).toHaveAttribute('aria-selected', 'true');

			expectNoGraphql(gql);
		});

		test('tab cycling: History -> Drivers -> current-season Season -> History, URL stable', async ({
			page
		}) => {
			const gql = trackGraphqlRequests(page);

			await page.goto(`/constructors/${ref}`);
			// Wait for tablist to appear — signals page has rendered (don't use networkidle)
			await expect(page.getByRole('tablist')).toBeVisible({ timeout: 30_000 });

			const urlBefore = page.url();
			const tablist = page.getByRole('tablist');

			// History (default)
			await expect(tablist.getByRole('tab', { name: /history/i })).toHaveAttribute(
				'aria-selected',
				'true'
			);

			// -> Drivers
			await tablist.getByRole('tab', { name: /drivers/i }).click();
			await page.waitForTimeout(200);
			expect(page.url()).toBe(urlBefore);
			await expect(tablist.getByRole('tab', { name: /drivers/i })).toHaveAttribute(
				'aria-selected',
				'true'
			);

			// -> current-season Season
			await tablist.getByRole('tab', { name: /\d{4} season/i }).click();
			await page.waitForTimeout(200);
			expect(page.url()).toBe(urlBefore);
			await expect(tablist.getByRole('tab', { name: /\d{4} season/i })).toHaveAttribute(
				'aria-selected',
				'true'
			);

			// -> back to History
			await tablist.getByRole('tab', { name: /history/i }).click();
			await page.waitForTimeout(200);
			expect(page.url()).toBe(urlBefore);
			await expect(tablist.getByRole('tab', { name: /history/i })).toHaveAttribute(
				'aria-selected',
				'true'
			);

			expectNoGraphql(gql);
		});
	});
}
