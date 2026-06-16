import { test, expect } from '@playwright/test';
import { DRIVERS_2025, CIRCUITS_2025 } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

/**
 * §6.4 — Driver circuit modal (deep-link + close).
 * Uses lando-norris (DRIVERS_2025[0]) and melbourne (CIRCUITS_2025[0]).
 *
 * Next.js intercepting routes behavior:
 *   - Hard-load /drivers/<ref>/circuits/<ref>: renders content as full-page card (NO dialog)
 *   - Soft-nav (clicking circuit link from Circuits tab): dialog overlay appears
 */

const DRIVER_REF = DRIVERS_2025[0];   // lando-norris
const CIRCUIT_REF = CIRCUITS_2025[0]; // melbourne

test.describe(`§6.4 — driver circuit dialog (${DRIVER_REF} @ ${CIRCUIT_REF})`, () => {
	test('hard-load /drivers/<ref>/circuits/<ref> renders circuit content (full-page card)', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto(`/drivers/${DRIVER_REF}/circuits/${CIRCUIT_REF}`);

		// Hard-load renders the circuit data as a full-page card, NOT a dialog
		// (dialog only appears via soft-nav/intercepting route)
		const mainContent = page.locator('main');
		await expect(mainContent).toBeVisible({ timeout: 15_000 });

		// Circuit name (Melbourne / Albert Park) appears in page
		await expect(page.locator('body')).toContainText(/melbourne|albert park/i, { timeout: 15_000 });

		// Driver name appears (subtitle or card header)
		await expect(page.locator('body')).toContainText(/Norris|norris/i);

		expectNoGraphql(gql);
	});

	test('hard-load: page renders driver-circuit content with driver name and circuit title', async ({ page }) => {
		await page.goto(`/drivers/${DRIVER_REF}/circuits/${CIRCUIT_REF}`);

		// Content rendered directly (no dialog on hard-load)
		await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });
		await expect(page.locator('main')).toContainText(/Norris|norris/i);
	});

	test('Circuits tab lists circuit links reachable as dialog', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto(`/drivers/${DRIVER_REF}?tab=circuits`);

		// Circuits tab should be active
		const circuitsTab = page.getByRole('tab', { name: /circuits/i });
		await expect(circuitsTab).toBeVisible({ timeout: 15_000 });

		// Find at least one /drivers/<ref>/circuits/<circuit> link in the tab panel
		const panel = page.locator('[role="tabpanel"]').first();
		await expect(panel).toBeVisible();

		const circuitLink = panel
			.getByRole('link')
			.filter({ hasText: /.+/ })
			.first();

		await expect(circuitLink).toBeVisible({ timeout: 10_000 });

		// Navigate to the circuit dialog via a circuit link in the Circuits tab
		const href = await circuitLink.getAttribute('href');
		if (href && href.includes('/circuits/')) {
			await circuitLink.click();

			// After soft-nav, dialog overlay appears
			const dialog = page.getByRole('dialog');
			await expect(dialog).toBeVisible({ timeout: 30_000 });

			// Close button label contains "close"
			const closeBtn = dialog.getByRole('button', { name: /close/i });
			await expect(closeBtn).toBeVisible();
		}

		expectNoGraphql(gql);
	});
});
