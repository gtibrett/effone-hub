import { test, expect } from '@playwright/test';
import { REPRESENTATIVE_DRIVERS } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

/**
 * §6.2 — Per-driver detail template.
 * Runs once per representative driver ref from the fixture.
 *
 * The season tab label is "<current year> Season" (e.g. "2026 Season"), not
 * hard-coded to 2025, since the app always shows the latest active season.
 */

for (const ref of REPRESENTATIVE_DRIVERS) {
	test.describe(`driver /${ref}`, () => {
		test('page loads, tabs visible, no GraphQL', async ({ page }) => {
			const gql = trackGraphqlRequests(page);
			await page.goto(`/drivers/${ref}`);

			// Heading renders with driver name
			const heading = page.locator('h1, h2').first();
			await expect(heading).toBeVisible({ timeout: 15_000 });
			// Heading text must be non-empty
			const headingText = await heading.textContent();
			expect(headingText?.trim().length).toBeGreaterThan(0);

			// Tabs bar shows Career and Circuits
			await expect(page.getByRole('tab', { name: /career/i })).toBeVisible();
			await expect(page.getByRole('tab', { name: /circuits/i })).toBeVisible();
			// All active drivers have a current-season tab (e.g. "2026 Season")
			await expect(page.getByRole('tab', { name: /\d{4} season/i })).toBeVisible();

			// Career tab is active by default
			const careerTab = page.getByRole('tab', { name: /career/i });
			await expect(careerTab).toHaveAttribute('aria-selected', 'true');

			expectNoGraphql(gql);
		});

		test('Career tab content renders', async ({ page }) => {
			const gql = trackGraphqlRequests(page);
			await page.goto(`/drivers/${ref}`);

			// Wait for Career tab panel to be visible
			await page.waitForSelector('[role="tabpanel"]', { timeout: 15_000 });

			// Stats summary (any of the typical stat labels)
			const statsArea = page.locator('[role="tabpanel"]').first();
			await expect(statsArea).toBeVisible();

			// Career Timeline chart card with toggle buttons
			const breakdownBtn = page.locator('button', { hasText: 'Breakdown' });
			await expect(breakdownBtn).toBeVisible({ timeout: 10_000 });

			// Career results grid — Season column header
			await expect(page.getByRole('columnheader', { name: /season/i })).toBeVisible();

			expectNoGraphql(gql);
		});

		test('Career Timeline toggles cycle without errors', async ({ page }) => {
			const gql = trackGraphqlRequests(page);
			await page.goto(`/drivers/${ref}`);

			// Wait for toggle group — use text-based locator (not ARIA role-name) since
			// MUI ToggleButton text is the accessible name but role="button" matches tabs too
			const breakdownBtn = page.locator('button', { hasText: 'Breakdown' });
			await breakdownBtn.waitFor({ timeout: 15_000 });

			const toggleLabels = ['Position', 'Points', 'Wins', 'Breakdown'];
			for (const label of toggleLabels) {
				const btn = page.locator('button', { hasText: label });
				if (await btn.isVisible()) {
					await btn.click();
					// Brief settle — no explicit assertion on chart content, just no crash
					await page.waitForTimeout(300);
				}
			}

			// No console-error crashes: toggle group must still be visible after cycling,
			// confirming no fatal chart crash (body.overflow:hidden from MUI chart tooltip
			// makes body "not visible" in a11y tree — check the toggle group instead).
			await expect(page.locator('button', { hasText: 'Breakdown' })).toBeVisible();

			expectNoGraphql(gql);
		});

		test('Circuits tab syncs URL to ?tab=circuits', async ({ page }) => {
			const gql = trackGraphqlRequests(page);
			await page.goto(`/drivers/${ref}`);

			const circuitsTab = page.getByRole('tab', { name: /circuits/i });
			await circuitsTab.waitFor({ timeout: 15_000 });
			await circuitsTab.click();

			// URL must include ?tab=circuits
			await expect(page).toHaveURL(/[?&]tab=circuits/, { timeout: 15_000 });

			// Circuits tab panel renders
			const panel = page.locator('[role="tabpanel"]').first();
			await expect(panel).toBeVisible();

			expectNoGraphql(gql);
		});

		test('current-season tab syncs URL to ?tab=season', async ({ page }) => {
			const gql = trackGraphqlRequests(page);
			await page.goto(`/drivers/${ref}`);

			// Tab label is "<year> Season" — match dynamically
			const seasonTab = page.getByRole('tab', { name: /\d{4} season/i });
			await seasonTab.waitFor({ timeout: 15_000 });
			await seasonTab.click();

			await expect(page).toHaveURL(/[?&]tab=season/, { timeout: 15_000 });

			const panel = page.locator('[role="tabpanel"]').first();
			await expect(panel).toBeVisible();

			expectNoGraphql(gql);
		});

		test('?tab=season URL param survives reload', async ({ page }) => {
			const gql = trackGraphqlRequests(page);
			await page.goto(`/drivers/${ref}?tab=season`);

			// After reload the current-season tab should be active
			const seasonTab = page.getByRole('tab', { name: /\d{4} season/i });
			await expect(seasonTab).toBeVisible({ timeout: 15_000 });
			await expect(seasonTab).toHaveAttribute('aria-selected', 'true');

			expectNoGraphql(gql);
		});
	});
}
