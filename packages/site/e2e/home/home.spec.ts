import { test, expect } from '@playwright/test';

import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

test.describe('Home Page — Section 3', () => {
	test.describe('3.1 Home renders current-season standings + schedule with no client GraphQL', () => {
		test("Driver's Standings ChartSwitcher is present with toggle and action button", async ({
			page
		}) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/');
			// Wait for Driver's Standings instead of networkidle — networkidle can take 30s under load
			await expect(
				page.getByText("Driver's Standings", { exact: true })
			).toBeVisible({ timeout: 30_000 });

			// Toggle buttons rendered by ChartSwitcherToggle (ToggleButton)
			// Use text-based locator since ToggleButton accessible name is its text
			await expect(page.locator('button', { hasText: 'Position' }).first()).toBeVisible({ timeout: 10_000 });
			await expect(page.locator('button', { hasText: 'Points' }).first()).toBeVisible();

			// "show full standings" action button
			const showFullButtons = page.locator('button', { hasText: 'show full standings' });
			await expect(showFullButtons.first()).toBeVisible({ timeout: 10_000 });

			expectNoGraphql(gql);
		});

		test("Constructor's Standings ChartSwitcher is present with toggle and action button", async ({
			page
		}) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/');
			// Constructor's Standings section
			await expect(
				page.getByText("Constructor's Standings", { exact: true })
			).toBeVisible({ timeout: 30_000 });

			// Two "show full standings" buttons exist (one per standings section)
			const showFullButtons = page.locator('button', { hasText: 'show full standings' });
			await expect(showFullButtons).toHaveCount(2, { timeout: 10_000 });

			expectNoGraphql(gql);
		});

		test('Schedule card renders with header, data grid columns, and race map', async ({
			page
		}) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/');
			// Schedule card header — wait for it specifically
			await expect(page.getByText('Schedule', { exact: true })).toBeVisible({ timeout: 30_000 });

			// Data Grid column headers — scope to the #season section to avoid strict-mode violations
			// when there are multiple Race columnheaders (one in next-race-weekend table, one in data grid)
			const scheduleGrid = page.locator('#season [role="grid"]');
			await expect(scheduleGrid.getByRole('columnheader', { name: 'Date' })).toBeVisible({ timeout: 15_000 });
			await expect(scheduleGrid.getByRole('columnheader', { name: 'Race' })).toBeVisible();
			// exact: true to avoid partial match on "Sprint Winner"
			await expect(scheduleGrid.getByRole('columnheader', { name: 'Winner', exact: true })).toBeVisible();
			await expect(scheduleGrid.getByRole('columnheader', { name: 'Sprint Winner' })).toBeVisible();

			expectNoGraphql(gql);
		});

		test('No /graphql network requests on home page load', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/');
			// Wait for main to render before checking network requests
			await expect(page.locator('main')).toBeVisible({ timeout: 30_000 });

			expectNoGraphql(gql);
		});
	});

	test.describe("3.2 Driver's Standings ChartSwitcher toggle — Position / Points", () => {
		test('toggling to Points and back to Position produces no console errors and no zero-width warning', async ({
			page
		}) => {
			const consoleErrors: string[] = [];
			page.on('console', msg => {
				if (msg.type() === 'error') {
					consoleErrors.push(msg.text());
				}
			});
			const consoleWarnings: string[] = [];
			page.on('console', msg => {
				if (msg.type() === 'warning') {
					consoleWarnings.push(msg.text());
				}
			});

			await page.goto('/');

			// Driver standings section: first ToggleButtonGroup contains Position + Points
			// The ChartSwitcher renders Position first (default active)
			const positionBtn = page.locator('button', { hasText: 'Position' }).first();
			const pointsBtn = page.locator('button', { hasText: 'Points' }).first();

			// Default: Position is active
			await expect(positionBtn).toBeVisible({ timeout: 30_000 });

			// Switch to Points
			await pointsBtn.click();
			// Allow chart to mount/render
			await page.waitForTimeout(300);

			// No zero-width chart error
			const zeroWidthWarnings = consoleWarnings.filter(w =>
				w.includes('ChartsContainer has no width')
			);
			expect(
				zeroWidthWarnings,
				'Expected no "ChartsContainer has no width" warnings after toggle'
			).toHaveLength(0);

			const zeroWidthErrors = consoleErrors.filter(e =>
				e.includes('ChartsContainer has no width')
			);
			expect(
				zeroWidthErrors,
				'Expected no "ChartsContainer has no width" errors after toggle'
			).toHaveLength(0);

			// Switch back to Position
			await positionBtn.click();
			await page.waitForTimeout(300);

			const zeroWidthWarningsAfter = consoleWarnings.filter(w =>
				w.includes('ChartsContainer has no width')
			);
			expect(
				zeroWidthWarningsAfter,
				'Expected no "ChartsContainer has no width" warnings after returning to Position'
			).toHaveLength(0);
		});

		test("both Driver's and Constructor's Standings toggle buttons are independently operable", async ({
			page
		}) => {
			await page.goto('/');

			// Wait for the ChartSwitchers to render
			await page.getByText("Driver's Standings", { exact: true }).waitFor({ timeout: 30_000 });

			// All four toggle buttons visible (2 per standings section)
			const positionBtns = page.locator('button', { hasText: 'Position' });
			const pointsBtns = page.locator('button', { hasText: 'Points' });
			await expect(positionBtns).toHaveCount(2, { timeout: 10_000 });
			await expect(pointsBtns).toHaveCount(2);

			// Toggle Driver standings to Points (first pair)
			await pointsBtns.first().click();
			await page.waitForTimeout(200);

			// Toggle Constructor standings to Points (second pair)
			await pointsBtns.nth(1).click();
			await page.waitForTimeout(200);

			// Both sections still visible
			await expect(page.getByText("Driver's Standings", { exact: true })).toBeVisible();
			await expect(page.getByText("Constructor's Standings", { exact: true })).toBeVisible();
		});
	});
});
