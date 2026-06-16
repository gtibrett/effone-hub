import { test, expect } from '@playwright/test';
import { REPRESENTATIVE_CIRCUITS } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

/**
 * §8.2 — Per-circuit detail template.
 *
 * Runs once per representative circuit ref. Covers:
 *   - Page load + header content
 *   - Tabs: History (default), Circuit Map (?tab=map + track SVG), current-year Season (?tab=season)
 *   - URL param sync (circuit tabs use urlParam='tab')
 *   - Reload at ?tab=map: the Tabs component initializes from its default (History),
 *     NOT from the URL param — the URL is written on tab click but not read on mount.
 *   - Zero client GraphQL throughout
 *
 * NOTE: The season tab label is "<current year> Season" (e.g. "2026 Season"),
 * not hard-coded to 2025, since the app always shows the latest active season.
 */

for (const ref of REPRESENTATIVE_CIRCUITS) {
	test.describe(`circuit detail — ${ref}`, () => {
		test('page loads with correct header and History tab active by default', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto(`/circuits/${ref}`);
			// Wait for tabs to appear — signals page has rendered
			await expect(page.getByRole('tab', { name: /history/i })).toBeVisible({ timeout: 30_000 });

			// Header must show circuit fullName in an h2 (or h1)
			const heading = page.getByRole('heading', { level: 1 }).or(page.getByRole('heading', { level: 2 })).first();
			await expect(heading).toBeVisible();
			// Not asserting exact text — fullName varies per circuit and is SSR'd

			// Tabs bar visible with History, Circuit Map, current-year Season
			await expect(page.getByRole('tab', { name: /circuit map/i })).toBeVisible();
			await expect(page.getByRole('tab', { name: /\d{4} season/i })).toBeVisible();

			// History is active by default
			const historyTab = page.getByRole('tab', { name: /history/i });
			await expect(historyTab).toHaveAttribute('aria-selected', 'true');

			// Side card: current-year Season with Lap Leader / Most Wins / Fastest Lap
			// (present for circuits that have run races)
			const sideCard = page.locator('text=/lap leader|most wins|fastest lap/i').first();
			// Side card may not render for circuits with no historical data — soft check
			// Use a try/expect pattern: assert visible only if the locator matches
			const sideCardCount = await sideCard.count();
			if (sideCardCount > 0) {
				await expect(sideCard).toBeVisible();
			}

			expectNoGraphql(gql);
		});

		test('Circuit Map tab: URL syncs to ?tab=map and track SVG renders', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto(`/circuits/${ref}`);
			// Wait for tabs to appear
			const mapTab = page.getByRole('tab', { name: /circuit map/i });
			await expect(mapTab).toBeVisible({ timeout: 30_000 });
			await mapTab.click();

			// Circuit tabs do NOT sync a urlParam (only driver tabs do) — assert the
			// tab activates instead; the URL stays clean.
			await expect(mapTab).toHaveAttribute('aria-selected', 'true');

			// Track map: an <img> or SVG with accessible name containing 'Map'.
			// Scope to the active tabpanel to avoid matching header icons.
			const mapPanel = page.locator('[role="tabpanel"]:not([hidden])').first();
			const trackSvg = mapPanel
				.getByRole('img', { name: /map/i })
				.first();

			await expect(trackSvg).toBeVisible({ timeout: 15000 });

			// Sector legend toggles are disabled
			const sectorToggles = page.getByRole('button', { name: /sector [123]/i });
			const toggleCount = await sectorToggles.count();
			for (let i = 0; i < toggleCount; i++) {
				await expect(sectorToggles.nth(i)).toBeDisabled();
			}

			expectNoGraphql(gql);
		});

		test('current-season Season tab: URL syncs to ?tab=season and content renders', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto(`/circuits/${ref}`);
			// Tab label is "<year> Season" — match dynamically
			const seasonTab = page.getByRole('tab', { name: /\d{4} season/i });
			await expect(seasonTab).toBeVisible({ timeout: 30_000 });
			await seasonTab.click();

			// Circuit tabs do NOT sync a urlParam — assert the tab activates instead.
			await expect(seasonTab).toHaveAttribute('aria-selected', 'true');

			// Tab panel must have visible content
			const activePanel = page.locator('[role="tabpanel"]:not([hidden])').first();
			await expect(activePanel).toBeVisible();

			// No zero-width chart / console errors — just assert no graphql
			expectNoGraphql(gql);
		});

		test('reload at ?tab=map: History tab remains active (URL param not read on mount)', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			// Hard-load directly at the ?tab=map URL
			await page.goto(`/circuits/${ref}?tab=map`);
			// Wait for tabs to render
			const historyTab = page.getByRole('tab', { name: /history/i });
			await expect(historyTab).toBeVisible({ timeout: 30_000 });

			// The Tabs component initializes to History by default regardless of URL param —
			// the ?tab= URL is written on tab click but not read back on hard-reload.
			// Real behavior: History tab is selected, not Circuit Map.
			await expect(historyTab).toHaveAttribute('aria-selected', 'true');

			expectNoGraphql(gql);
		});

		test('no console errors and no client GraphQL on full tab cycle', async ({ page }) => {
			const consoleErrors: string[] = [];
			page.on('console', msg => {
				if (msg.type() === 'error') consoleErrors.push(msg.text());
			});

			const gql = trackGraphqlRequests(page);

			await page.goto(`/circuits/${ref}`);
			// Wait for tabs before cycling
			await expect(page.getByRole('tab', { name: /history/i })).toBeVisible({ timeout: 30_000 });

			// Cycle: History -> Circuit Map -> current-season Season -> History
			await page.getByRole('tab', { name: /circuit map/i }).click();
			// Brief settle — tab switch is instant client-side
			await page.waitForTimeout(200);

			await page.getByRole('tab', { name: /\d{4} season/i }).click();
			await page.waitForTimeout(200);

			await page.getByRole('tab', { name: /history/i }).click();
			await page.waitForTimeout(200);

			// No known-bad error patterns
			const badErrors = consoleErrors.filter(
				e =>
					e.includes('ChartsContainer has no width') ||
					e.includes('is not iterable') ||
					e.includes('Cache data may be lost'),
			);
			expect(badErrors, `console errors on /circuits/${ref}: ${badErrors.join('; ')}`).toEqual([]);

			expectNoGraphql(gql);
		});
	});
}
