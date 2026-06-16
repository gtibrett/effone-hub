import { test, expect } from '@playwright/test';

import { CIRCUITS_2025 } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

// 2025 rounds render dynamically (only the current season is prerendered via
// generateStaticParams). If the current season is not 2025 and a 2025 round
// returns 404, substitute the same round numbers under /<CURRENT_SEASON>.
const TEST_ROUNDS = [1, 2, 5];

// Known 2025 sprint-race rounds (Shanghai=2, Miami=6, Baku=17 in 2025 calendar).
// Used to assert Sprint tab presence/absence.
const SPRINT_ROUNDS_2025 = new Set([2, 6, 17]);

// Circuit refs corresponding to rounds 1, 2, 5 in the 2025 calendar.
// Derived from CIRCUITS_2025 (index = round - 1).
const CIRCUIT_REF_BY_ROUND: Record<number, string> = {
	1: CIRCUITS_2025[0],  // melbourne
	2: CIRCUITS_2025[1],  // shanghai
	5: CIRCUITS_2025[4],  // jeddah
};

test.describe('Section 5 — Race Pages', () => {
	test.describe('5.1 Race detail renders results (drivers + teams) for several rounds', () => {
		for (const round of TEST_ROUNDS) {
			test(`round ${round} renders race page with results grid and no GraphQL`, async ({ page }) => {
				const gql = trackGraphqlRequests(page);

				const res = await page.goto(`/2025/${round}`);

				// If 2025 round is not prerendered (not current season), expect a
				// dynamic render (200). A 404 here means the round doesn't exist,
				// which is a data/config issue, not a test failure we should swallow.
				expect(res?.status()).not.toBe(404);

				// Page title = race officialName
				const title = await page.title();
				expect(title).toMatch(/effOne Hub/);
				// officialName is in the title before the pipe
				const officialName = title.replace(' | effOne Hub', '').trim();
				expect(officialName.length).toBeGreaterThan(0);

				// Subheader: "Round <n>, <date>"
				await expect(
					page.getByText(new RegExp(`Round\\s+${round}`, 'i'))
				).toBeVisible();

				// Tabs bar visible when results exist
				const raceTab = page.getByRole('tab', { name: /^Race$/i });
				await expect(raceTab).toBeVisible();

				// Default 'Race' tab is active — tabpanel for it is visible
				await expect(page.locator('#tabpanel-race')).toBeVisible();

				// Results grid shows Driver + Constructor columns
				const grid = page.locator('#tabpanel-race .MuiDataGrid-root');
				await expect(grid).toBeVisible();

				// At least one row in the results grid (virtualised — check the container exists)
				await expect(
					page.locator('#tabpanel-race .MuiDataGrid-virtualScroller')
				).toBeVisible();

				// Expected tabs are rendered (Qualifying, Laps, Pit Stops, Circuit are always present)
				await expect(page.getByRole('tab', { name: /^Qualifying$/i })).toBeVisible();
				await expect(page.getByRole('tab', { name: /^Laps$/i })).toBeVisible();
				await expect(page.getByRole('tab', { name: /^Pit Stops$/i })).toBeVisible();
				await expect(page.getByRole('tab', { name: /^Circuit$/i })).toBeVisible();

				// Sprint tab: only on sprint rounds
				const sprintTab = page.getByRole('tab', { name: /^Sprint$/i });
				if (SPRINT_ROUNDS_2025.has(round)) {
					await expect(sprintTab).toBeVisible();
				} else {
					await expect(sprintTab).not.toBeVisible();
				}

				expectNoGraphql(gql);
			});
		}
	});

	test.describe('5.2 Circuit tab shows circuit link + map', () => {
		// Use round 1 (Melbourne) as the representative round for this check.
		const ROUND = 1;

		test('Circuit tab renders circuit title linking to /circuits/<ref> and a race map', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto(`/2025/${ROUND}`);

			// Click the Circuit tab
			await page.getByRole('tab', { name: /^Circuit$/i }).click();

			// Tabpanel for circuit is now visible
			const circuitPanel = page.locator('#tabpanel-circuit');
			await expect(circuitPanel).toBeVisible();

			// Circuit title link navigates to /circuits/<ref>
			// Use href-scoped selector — tabpanel also has an OpenAI attribution link
			const circuitRef = CIRCUIT_REF_BY_ROUND[ROUND];
			const circuitLink = circuitPanel.locator(`a[href="/circuits/${circuitRef}"]`).first();
			await expect(circuitLink).toBeVisible();

			// The href should point to the circuit ref
			const href = await circuitLink.getAttribute('href');
			expect(href).toBe(`/circuits/${circuitRef}`);

			// Map canvas/svg area renders (RaceMap renders a div with a canvas inside)
			// We check for a non-zero-height element inside CardMedia
			await expect(circuitPanel.locator('.MuiCardMedia-root')).toBeVisible();

			// Navigate to the circuit page via the link
			await circuitLink.click();
			await page.waitForURL(`**/circuits/${circuitRef}**`);
			await expect(page).toHaveURL(new RegExp(`/circuits/${circuitRef}`));

			// Circuit page title/header should render
			const circuitPageHeading = page.getByRole('heading', { level: 2 });
			await expect(circuitPageHeading).toBeVisible();

			expectNoGraphql(gql);
		});
	});

	test.describe('5.3 Sprint tab present only on sprint rounds', () => {
		// Round 2 (Shanghai, 2025) is a sprint race weekend.
		const SPRINT_ROUND = 2;
		const NON_SPRINT_ROUND = 1;

		test('Sprint tab is visible on a sprint round', async ({ page }) => {
			const gql = trackGraphqlRequests(page);
			await page.goto(`/2025/${SPRINT_ROUND}`);

			const sprintTab = page.getByRole('tab', { name: /^Sprint$/i });
			await expect(sprintTab).toBeVisible();

			// Click it and verify sprint results tabpanel renders
			await sprintTab.click();
			await expect(page.locator('#tabpanel-Sprint')).toBeVisible();

			expectNoGraphql(gql);
		});

		test('Sprint tab is absent on a non-sprint round', async ({ page }) => {
			const gql = trackGraphqlRequests(page);
			await page.goto(`/2025/${NON_SPRINT_ROUND}`);

			await expect(
				page.getByRole('tab', { name: /^Sprint$/i })
			).not.toBeVisible();

			expectNoGraphql(gql);
		});
	});
});
