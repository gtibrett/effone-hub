import { test, expect } from '@playwright/test';
import { DRIVERS_2025 } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

/**
 * §6.3 — Driver season modal (deep-link + interception).
 * Uses one representative 2025 driver: lando-norris (P1 in 2025 standings,
 * has races in both 2024 and 2025).
 *
 * Next.js intercepting routes behavior:
 *   - Hard-load /drivers/<ref>/seasons/<year>?tab=career: renders season content
 *     as a full-page card (NO dialog — intercepting route only fires via soft-nav)
 *   - Soft-nav (clicking season cell in career grid): dialog overlay appears,
 *     close button is labeled "close dialog", closing returns to driver page
 */

const DRIVER_REF = DRIVERS_2025[0]; // lando-norris

test.describe(`§6.3 — driver season dialog (${DRIVER_REF})`, () => {
	test('hard-load /drivers/<ref>/seasons/2024?tab=career renders season content (full-page)', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto(`/drivers/${DRIVER_REF}/seasons/2024?tab=career`);

		// Hard-load renders season data as a full-page card (NOT a dialog)
		// Intercepting-route dialog only appears via soft-nav from the driver page
		const mainContent = page.locator('main');
		await expect(mainContent).toBeVisible({ timeout: 15_000 });

		// Content contains "2024" season reference
		await expect(mainContent).toContainText('2024', { timeout: 10_000 });

		// Driver name appears in page content
		await expect(page.locator('body')).toContainText(/Norris|norris/i);

		expectNoGraphql(gql);
	});

	test('soft-nav: career grid season cell opens dialog as overlay', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto(`/drivers/${DRIVER_REF}`);

		// Ensure Career tab is active
		const careerTab = page.getByRole('tab', { name: /career/i });
		await expect(careerTab).toBeVisible({ timeout: 15_000 });
		await careerTab.click();

		// Wait for career results grid with Season column
		await page.getByRole('columnheader', { name: /season/i }).waitFor({ timeout: 10_000 });

		// Click the first visible season cell link — must be scoped to tabpanel to
		// avoid matching the nav bar year link (which also matches /^20\d{2}$/)
		const tabPanel = page.locator('[role="tabpanel"]').first();
		const seasonLink = tabPanel.getByRole('link', { name: /^20\d{2}$/ }).first();
		await expect(seasonLink).toBeVisible({ timeout: 5_000 });

		const seasonHref = await seasonLink.getAttribute('href');
		await seasonLink.click();

		// URL becomes the season route
		if (seasonHref) {
			await expect(page).toHaveURL(new RegExp('seasons/\\d{4}'), { timeout: 15_000 });
		}

		// Dialog opens as overlay
		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible({ timeout: 30_000 });

		// Close dialog — pops back to the driver page (soft-nav)
		const closeBtn = dialog.getByRole('button', { name: /close/i });
		await expect(closeBtn).toBeVisible();
		await closeBtn.click();

		await expect(page).toHaveURL(new RegExp(`/drivers/${DRIVER_REF}`), { timeout: 5_000 });
		// Dialog dismissed
		await expect(dialog).not.toBeVisible();

		expectNoGraphql(gql);
	});
});
