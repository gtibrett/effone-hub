import { test, expect } from '@playwright/test';
import { CIRCUITS_2025, SEASON_2025 } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';
import { selectSeason } from '../fixtures/season-select';

/**
 * §8.1 — Harvest the full 2025 circuit ref list and assert fixture consistency.
 *
 * Primary harvest path: /circuits list with Season=2025 filter.
 * Cross-check: /2025 Schedule -> each race round's Circuit tab title link.
 * Asserts harvested count == CIRCUITS_2025.length (24) and every fixture ref appears.
 */
test.describe('Harvest 2025 circuits', () => {
	test('fixture has correct length (24)', () => {
		expect(CIRCUITS_2025.length).toBe(24);
	});

	test('fixture refs are unique', () => {
		const unique = new Set(CIRCUITS_2025);
		expect(unique.size).toBe(CIRCUITS_2025.length);
	});

	test('harvest /circuits list with Season=2025 and cross-check fixture', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		// --- primary harvest: /circuits list filtered to 2025 ---
		await page.goto('/circuits');
		// Wait for search button before interacting (don't use networkidle — too slow under load)
		await page.getByRole('button', { name: /search/i }).waitFor({ state: 'visible', timeout: 30_000 });

		// Set season filter to 2025
		await selectSeason(page, 'circuits-season-filter', SEASON_2025);

		// Submit via Search button
		await page.getByRole('button', { name: /search/i }).click();

		// Collect circuit hrefs — MUI Data Grid virtualises; scroll to force all rows
		const harvestedRefs: string[] = [];

		// Scroll the grid to expose all virtualised rows
		const grid = page.locator('[role="grid"]').first();
		await expect(grid).toBeVisible();

		let prevCount = 0;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const links = await page.locator('a[href^="/circuits/"]').all();
			const refs = (
				await Promise.all(
					links.map(async l => {
						const href = await l.getAttribute('href');
						return href ? href.replace('/circuits/', '') : null;
					}),
				)
			).filter((r): r is string => r !== null);

			for (const r of refs) {
				if (!harvestedRefs.includes(r)) harvestedRefs.push(r);
			}

			if (harvestedRefs.length === prevCount) break;
			prevCount = harvestedRefs.length;

			// Scroll grid down to expose next virtualised batch
			await grid.evaluate(el => el.scrollBy(0, 400));
			await page.waitForTimeout(150);
		}

		// --- assertions ---
		expect(harvestedRefs.length).toBeGreaterThan(0);
		expect(harvestedRefs.length).toBe(24);

		// Every fixture ref must appear in the harvest
		for (const ref of CIRCUITS_2025) {
			expect(harvestedRefs, `expected '${ref}' in harvested circuit list`).toContain(ref);
		}

		// Every harvested ref must appear in the fixture
		for (const ref of harvestedRefs) {
			expect(
				CIRCUITS_2025 as readonly string[],
				`harvested ref '${ref}' not in CIRCUITS_2025 fixture`,
			).toContain(ref);
		}

		expectNoGraphql(gql);
	});

	test('cross-check via /2025 schedule rounds — sample first three rounds', async ({ page }) => {
		// Spot-check rounds 1, 2, 3: each race page must link to a /circuits/<ref>
		// that is in CIRCUITS_2025. (Full round sweep is expensive; §8.2 covers every ref.)
		const gql = trackGraphqlRequests(page);

		for (const round of [1, 2, 3]) {
			await page.goto(`/2025/${round}`);
			// The Circuit tab is one of the tab items
			const circuitTab = page.getByRole('tab', { name: /circuit/i });
			await expect(circuitTab).toBeVisible({ timeout: 30_000 });
			await circuitTab.click();

			// After clicking, a /circuits/<ref> link should be visible as the title
			const circuitLink = page.locator('a[href^="/circuits/"]').first();
			await expect(circuitLink).toBeVisible();

			const href = await circuitLink.getAttribute('href');
			expect(href).toMatch(/^\/circuits\/.+/);

			const ref = href!.replace('/circuits/', '');
			expect(
				CIRCUITS_2025 as readonly string[],
				`round ${round} circuit ref '${ref}' not in CIRCUITS_2025`,
			).toContain(ref);
		}

		expectNoGraphql(gql);
	});
});
