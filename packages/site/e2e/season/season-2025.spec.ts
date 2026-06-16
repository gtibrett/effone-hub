import { test, expect } from '@playwright/test';
import { DRIVERS_2025, CONSTRUCTORS_2025 } from '../fixtures/season-2025';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

test.describe('Section 4 — Season 2025 Page', () => {
	test('4.1.1 /2025 renders headings, ChartSwitchers, schedule with no client GraphQL', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/2025');
		// Heading — wait for it instead of networkidle (networkidle can take 30s under load)
		await expect(page.getByRole('heading', { name: '2025 Season' })).toBeVisible({ timeout: 30_000 });

		// Driver Standings ChartSwitcher
		const driverStandings = page.getByText("Driver's Standings");
		await expect(driverStandings).toBeVisible({ timeout: 10_000 });

		// Position + Points toggles for driver standings
		// Use text-based locator since getByRole('button') may not resolve MUI ToggleButton by name
		const positionButtons = page.locator('button', { hasText: 'Position' });
		await expect(positionButtons.first()).toBeVisible({ timeout: 10_000 });
		const pointsButtons = page.locator('button', { hasText: 'Points' });
		await expect(pointsButtons.first()).toBeVisible();

		// "show full standings" button (driver)
		const showFullStandingsButtons = page.locator('button', { hasText: 'show full standings' });
		await expect(showFullStandingsButtons.first()).toBeVisible({ timeout: 10_000 });

		// Constructor Standings ChartSwitcher
		const constructorStandings = page.getByText("Constructor's Standings");
		await expect(constructorStandings).toBeVisible();

		// Schedule card
		await expect(page.getByText('Schedule')).toBeVisible();

		// Schedule Data Grid renders race rows (at least one)
		const grid = page.locator('[role="grid"]');
		await expect(grid.first()).toBeVisible();

		expectNoGraphql(gql);
	});

	test('4.1.2 Driver Standings "show full standings" dialog lists all P1–P3 + remaining drivers linking to /drivers/<ref>', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/2025');
		// Wait for buttons to render before clicking (don't use networkidle — too slow under load)
		const showButtons = page.locator('button', { hasText: 'show full standings' });
		await expect(showButtons.first()).toBeVisible({ timeout: 30_000 });

		// Open driver standings dialog — first "show full standings" button
		await showButtons.first().click();

		// Dialog with title '2025 Driver Standings'
		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible({ timeout: 10_000 });
		await expect(dialog.getByText('2025 Driver Standings')).toBeVisible();

		// Verify driver links in dialog point to /drivers/<ref>
		// Collect all /drivers/ hrefs inside the dialog
		const driverLinks = dialog.locator('a[href^="/drivers/"]');
		const count = await driverLinks.count();
		expect(count).toBeGreaterThanOrEqual(1);

		// Every href must be one of the verified 2025 driver refs
		const validRefs = new Set(DRIVERS_2025.map(ref => `/drivers/${ref}`));
		for (let i = 0; i < count; i++) {
			const href = await driverLinks.nth(i).getAttribute('href');
			// href may have trailing segments (e.g. /drivers/lando-norris) or be exact
			expect(href).toMatch(/^\/drivers\//);
			// strip any sub-path to get just the ref segment
			const ref = href?.split('/').slice(0, 3).join('/') ?? '';
			expect(validRefs.has(ref)).toBe(true);
		}

		expectNoGraphql(gql);
	});

	test('4.1.3 Clicking P1 driver link from dialog navigates to that driver detail page', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/2025');
		// Wait for buttons to render before clicking
		const showButtons = page.locator('button', { hasText: 'show full standings' });
		await expect(showButtons.first()).toBeVisible({ timeout: 30_000 });

		// Open driver standings dialog
		await showButtons.first().click();
		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible({ timeout: 10_000 });

		// Click the first /drivers/ link (P1 or first listed driver)
		const firstDriverLink = dialog.locator('a[href^="/drivers/"]').first();
		const href = await firstDriverLink.getAttribute('href');
		expect(href).toBeTruthy();

		await firstDriverLink.click();
		// Wait for navigation to the driver detail page (URL changes from /2025).
		await page.waitForURL(`**/drivers/**`, { timeout: 30_000 });

		// Should be on the driver detail page
		// extract ref from href for assertion
		const ref = href!.split('/').slice(0, 3).join('/');
		expect(page.url()).toContain(ref);

		// Driver detail page renders an h2 with the driver name
		await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible({ timeout: 15_000 });

		expectNoGraphql(gql);
	});

	test('4.1.4 Constructor Standings "show full standings" dialog lists teams linking to /constructors/<ref>', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/2025');
		// Wait for buttons to render
		const showButtons = page.locator('button', { hasText: 'show full standings' });
		await expect(showButtons.first()).toBeVisible({ timeout: 30_000 });

		// The constructor standings section follows driver standings; click the second "show full standings" button
		const count = await showButtons.count();
		// Use the last one if only two; if only one try that
		const targetIndex = count > 1 ? 1 : 0;
		await showButtons.nth(targetIndex).click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible({ timeout: 10_000 });
		await expect(dialog.getByText(/Constructor Standings/i)).toBeVisible();

		// Verify constructor links
		const constructorLinks = dialog.locator('a[href^="/constructors/"]');
		const linkCount = await constructorLinks.count();
		expect(linkCount).toBeGreaterThanOrEqual(1);

		const validRefs = new Set(CONSTRUCTORS_2025.map(ref => `/constructors/${ref}`));
		for (let i = 0; i < linkCount; i++) {
			const href = await constructorLinks.nth(i).getAttribute('href');
			expect(href).toMatch(/^\/constructors\//);
			const ref = href?.split('/').slice(0, 3).join('/') ?? '';
			expect(validRefs.has(ref)).toBe(true);
		}

		// Click one constructor link
		const firstLink = constructorLinks.first();
		const firstHref = await firstLink.getAttribute('href');
		await firstLink.click();
		// Wait for navigation to the constructor detail page (URL changes from /2025).
		await page.waitForURL(`**/constructors/**`, { timeout: 30_000 });

		expect(page.url()).toContain(firstHref!.split('/').slice(0, 3).join('/'));
		await expect(page.getByRole('heading', { level: 2 })).toBeVisible({ timeout: 15_000 });

		expectNoGraphql(gql);
	});

	test('4.1.5 Schedule grid round-1 race link navigates to /2025/1', async ({ page }) => {
		const gql = trackGraphqlRequests(page);

		await page.goto('/2025');
		// Find a link in the schedule grid that points to /2025/1 (exact path, avoid /2025/10-19)
		// Use ^ to match hrefs that START with /2025/1 followed by # or end of string
		const round1Link = page.locator('a[href^="/2025/1#"]').first();
		await expect(round1Link).toBeVisible({ timeout: 30_000 });

		await round1Link.click();
		await page.waitForURL('**/2025/1**', { timeout: 30_000 });

		// Should be on the race detail page for 2025 round 1
		expect(page.url()).toContain('/2025/1');

		// Race detail page renders — page has visible content (title or heading)
		await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 15_000 });

		expectNoGraphql(gql);
	});

	test('4.1 Driver Standings ChartSwitcher toggles Position/Points without errors', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		const consoleErrors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') consoleErrors.push(msg.text());
		});

		await page.goto('/2025');
		// Wait for ChartSwitcher to render
		await page.getByText("Driver's Standings").waitFor({ timeout: 30_000 });

		// Toggle to Points
		await page.locator('button', { hasText: 'Points' }).first().click();
		await page.waitForTimeout(300);

		// Toggle back to Position
		await page.locator('button', { hasText: 'Position' }).first().click();
		await page.waitForTimeout(300);

		// No zero-width chart errors
		const chartErrors = consoleErrors.filter(e =>
			e.includes('ChartsContainer has no width') ||
			e.includes('is not iterable')
		);
		expect(chartErrors).toEqual([]);

		expectNoGraphql(gql);
	});
});
