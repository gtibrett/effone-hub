import { test, expect } from '@playwright/test';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

test.describe('Header Navigation — desktop', () => {
	// Desktop viewport so the inline nav renders (hidden below md/900px).
	test.use({ viewport: { width: 1280, height: 800 } });

	test('logo visible as h1 link to /', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		// Wait for nav to be ready rather than networkidle (which can take 30s under load)
		const nav = page.getByRole('navigation', { name: 'main navigation' });
		await expect(nav).toBeVisible({ timeout: 30_000 });

		// <Typography component="h1"> inside a Link href="/"
		const logo = page.getByRole('heading', { level: 1 });
		await expect(logo).toBeVisible();
		// The heading text reads "EFF ONE HUB" across child spans; contains "EFF" and "HUB".
		await expect(logo).toContainText('EFF');
		await expect(logo).toContainText('HUB');

		// Closest anchor wrapping the h1 should point to "/"
		const logoLink = page.locator('a:has(h1)');
		await expect(logoLink).toHaveAttribute('href', '/');

		expectNoGraphql(gql);
	});

	test('inline nav shows all expected links', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'main navigation' });
		await expect(nav).toBeVisible({ timeout: 30_000 });
		// Brief wait for React hydration — CountdownClock causes server/client mismatch
		// that triggers full re-render; links are stale until hydration completes.
		await page.waitForTimeout(800);

		// Inline nav is the Box with class containing "hidden md:contents".
		// At 1280px the links are visible.  Assert each by exact text.
		await expect(page.getByRole('link', { name: 'Past Seasons' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Circuits' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Constructors' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Drivers' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'About' })).toBeVisible();

		expectNoGraphql(gql);
	});

	test('current-season nav link label is a 4-digit year and routes to /<year>', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		// Wait for nav to be ready
		const nav = page.getByRole('navigation', { name: 'main navigation' });
		await expect(nav).toBeVisible({ timeout: 30_000 });
		// Brief wait for React hydration — CountdownClock causes server/client mismatch
		// that triggers full re-render; links are stale until hydration completes.
		await page.waitForTimeout(800);

		// The first nav link is the dynamic currentSeason year.
		// Locate it by finding a nav link whose text is a 4-digit number.
		// All nav links in the inline bar
		const allLinks = nav.getByRole('link');
		let seasonLink: ReturnType<typeof page.locator> | null = null;
		let currentSeason = '';

		const count = await allLinks.count();
		for (let i = 0; i < count; i++) {
			const text = (await allLinks.nth(i).textContent()) ?? '';
			if (/^\d{4}$/.test(text.trim())) {
				currentSeason = text.trim();
				seasonLink = allLinks.nth(i);
				break;
			}
		}

		expect(currentSeason).toMatch(/^\d{4}$/);
		expect(seasonLink).not.toBeNull();
		await expect(seasonLink!).toBeVisible();

		await seasonLink!.click();
		await page.waitForURL(`**/${currentSeason}`, { timeout: 30_000 });
		await expect(page).toHaveURL(`/${currentSeason}`);
		// Page heading contains the year — use h2 to avoid matching the logo h1
		await expect(page.getByRole('heading', { level: 2 }).first()).toContainText(currentSeason, { timeout: 15_000 });

		expectNoGraphql(gql);
	});

	test('Past Seasons nav link routes to /seasons', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'main navigation' });
		await expect(nav).toBeVisible({ timeout: 30_000 });
		// Brief wait for React hydration — CountdownClock causes server/client mismatch
		// that triggers full re-render; links are stale until hydration completes.
		await page.waitForTimeout(800);

		await page.getByRole('link', { name: 'Past Seasons' }).click();
		await page.waitForURL('**/seasons', { timeout: 30_000 });

		await expect(page).toHaveURL('/seasons');
		await expect(page.getByRole('heading', { name: 'Past Seasons' })).toBeVisible({ timeout: 15_000 });

		expectNoGraphql(gql);
	});

	test('Circuits nav link routes to /circuits', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'main navigation' });
		await expect(nav).toBeVisible({ timeout: 30_000 });
		// Brief wait for React hydration — CountdownClock causes server/client mismatch
		// that triggers full re-render; links are stale until hydration completes.
		await page.waitForTimeout(800);

		await page.getByRole('link', { name: 'Circuits' }).click();
		await page.waitForURL('**/circuits', { timeout: 30_000 });

		await expect(page).toHaveURL('/circuits');
		await expect(page.getByRole('heading', { name: 'Circuits' })).toBeVisible({ timeout: 15_000 });

		expectNoGraphql(gql);
	});

	test('Constructors nav link routes to /constructors', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'main navigation' });
		await expect(nav).toBeVisible({ timeout: 30_000 });
		// Brief wait for React hydration — CountdownClock causes server/client mismatch
		// that triggers full re-render; links are stale until hydration completes.
		await page.waitForTimeout(800);

		await page.getByRole('link', { name: 'Constructors' }).click();
		await page.waitForURL('**/constructors', { timeout: 30_000 });

		await expect(page).toHaveURL('/constructors');
		await expect(page.getByRole('heading', { name: 'Constructors' })).toBeVisible({ timeout: 15_000 });

		expectNoGraphql(gql);
	});

	test('Drivers nav link routes to /drivers', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'main navigation' });
		await expect(nav).toBeVisible({ timeout: 30_000 });
		// Brief wait for React hydration — CountdownClock causes server/client mismatch
		// that triggers full re-render; links are stale until hydration completes.
		await page.waitForTimeout(800);

		await page.getByRole('link', { name: 'Drivers' }).click();
		await page.waitForURL('**/drivers', { timeout: 30_000 });

		await expect(page).toHaveURL('/drivers');
		await expect(page.getByRole('heading', { name: 'Drivers' })).toBeVisible({ timeout: 15_000 });

		expectNoGraphql(gql);
	});

	test('About nav link routes to /about', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'main navigation' });
		await expect(nav).toBeVisible({ timeout: 30_000 });
		// Brief wait for React hydration — CountdownClock causes server/client mismatch
		// that triggers full re-render; links are stale until hydration completes.
		await page.waitForTimeout(800);

		await page.getByRole('link', { name: 'About' }).click();
		await page.waitForURL('**/about', { timeout: 30_000 });

		await expect(page).toHaveURL('/about');
		await expect(page.getByRole('heading', { name: 'About effOne Hub' })).toBeVisible({ timeout: 15_000 });

		expectNoGraphql(gql);
	});

	test('logo click from inner page returns to /', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/drivers');
		// Wait for the nav to be ready (don't networkidle — too slow under load)
		await expect(page.getByRole('navigation', { name: 'main navigation' })).toBeVisible({ timeout: 30_000 });

		await page.locator('a:has(h1)').click();
		await page.waitForURL('**/', { timeout: 30_000 });

		await expect(page).toHaveURL('/');

		expectNoGraphql(gql);
	});

	test('full nav traversal from / returns to /', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'main navigation' });
		await expect(nav).toBeVisible({ timeout: 30_000 });
		// Wait for React hydration to complete — CountdownClock causes a hydration
		// mismatch (server vs client timer value differs by ~1-2s). If we click links
		// immediately, we may hit the un-hydrated href before Next.js router attaches.
		await page.waitForTimeout(1000);

		// Derive dynamic currentSeason first
		const allLinks = nav.getByRole('link');
		let currentSeason = '';
		const count = await allLinks.count();
		for (let i = 0; i < count; i++) {
			const text = (await allLinks.nth(i).textContent()) ?? '';
			if (/^\d{4}$/.test(text.trim())) {
				currentSeason = text.trim();
				break;
			}
		}
		expect(currentSeason).toMatch(/^\d{4}$/);

		// Wait for the season link to be fully stable before clicking
		const seasonNavLink = nav.getByRole('link', { name: currentSeason, exact: true });
		await expect(seasonNavLink).toBeVisible({ timeout: 10_000 });

		// currentSeason
		await seasonNavLink.click();
		await page.waitForURL(`**/${currentSeason}`, { timeout: 30_000 });
		await expect(page).toHaveURL(`/${currentSeason}`);

		// Past Seasons
		await nav.getByRole('link', { name: 'Past Seasons' }).click();
		await page.waitForURL('**/seasons', { timeout: 30_000 });
		await expect(page).toHaveURL('/seasons');

		// Circuits
		await nav.getByRole('link', { name: 'Circuits' }).click();
		await page.waitForURL('**/circuits', { timeout: 30_000 });
		await expect(page).toHaveURL('/circuits');

		// Constructors
		await nav.getByRole('link', { name: 'Constructors' }).click();
		await page.waitForURL('**/constructors', { timeout: 30_000 });
		await expect(page).toHaveURL('/constructors');

		// Drivers
		await nav.getByRole('link', { name: 'Drivers' }).click();
		await page.waitForURL('**/drivers', { timeout: 30_000 });
		await expect(page).toHaveURL('/drivers');

		// About
		await nav.getByRole('link', { name: 'About' }).click();
		await page.waitForURL('**/about', { timeout: 30_000 });
		await expect(page).toHaveURL('/about');
		await expect(page.getByRole('heading', { name: 'About effOne Hub' })).toBeVisible({ timeout: 15_000 });

		// Logo back to home
		await page.locator('a:has(h1)').click();
		await page.waitForURL('**/', { timeout: 30_000 });
		await expect(page).toHaveURL('/');

		expectNoGraphql(gql);
	});
});
