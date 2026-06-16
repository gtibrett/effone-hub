import { test, expect } from '@playwright/test';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

test.describe('Mobile hamburger navigation', () => {
	// Mobile viewport: below md (900px) the inline links collapse into the hamburger.
	test.use({ viewport: { width: 390, height: 844 } });

	test('hamburger button opens #hamburger-menu with all nav items', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		// Wait for hamburger to be visible (don't networkidle — too slow under load)
		await expect(page.locator('#hamburger-button')).toBeVisible({ timeout: 30_000 });

		// Desktop links should be visually hidden; hamburger button visible.
		const hamburger = page.locator('#hamburger-button');
		await expect(hamburger).toBeVisible();
		await expect(hamburger).toHaveAttribute('aria-label', 'toggle navigation menu');

		// Open the menu
		await hamburger.click();

		const menu = page.locator('#hamburger-menu');
		await expect(menu).toBeVisible();

		// Derive dynamic currentSeason from the first menu item that is a 4-digit number.
		const items = menu.getByRole('menuitem');
		const count = await items.count();
		let currentSeason = '';
		for (let i = 0; i < count; i++) {
			const text = (await items.nth(i).textContent()) ?? '';
			if (/^\d{4}$/.test(text.trim())) {
				currentSeason = text.trim();
				break;
			}
		}
		expect(currentSeason).toMatch(/^\d{4}$/);

		// All six labels must be present
		await expect(menu.getByRole('menuitem', { name: currentSeason })).toBeVisible();
		await expect(menu.getByRole('menuitem', { name: 'Past Seasons' })).toBeVisible();
		await expect(menu.getByRole('menuitem', { name: 'Circuits' })).toBeVisible();
		await expect(menu.getByRole('menuitem', { name: 'Constructors' })).toBeVisible();
		await expect(menu.getByRole('menuitem', { name: 'Drivers' })).toBeVisible();
		await expect(menu.getByRole('menuitem', { name: 'About' })).toBeVisible();

		expectNoGraphql(gql);
	});

	test('current-season menu item routes to /<year>', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		await expect(page.locator('#hamburger-button')).toBeVisible({ timeout: 30_000 });

		await page.locator('#hamburger-button').click();
		const menu = page.locator('#hamburger-menu');
		await expect(menu).toBeVisible();

		const items = menu.getByRole('menuitem');
		let currentSeason = '';
		const count = await items.count();
		for (let i = 0; i < count; i++) {
			const text = (await items.nth(i).textContent()) ?? '';
			if (/^\d{4}$/.test(text.trim())) {
				currentSeason = text.trim();
				break;
			}
		}
		expect(currentSeason).toMatch(/^\d{4}$/);

		await menu.getByRole('menuitem', { name: currentSeason }).click();
		await page.waitForURL(`**/${currentSeason}`, { timeout: 30_000 });

		await expect(page).toHaveURL(`/${currentSeason}`);
		// Menu should close after navigation
		await expect(menu).not.toBeVisible();

		expectNoGraphql(gql);
	});

	test('Drivers menu item routes to /drivers and menu closes', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		await expect(page.locator('#hamburger-button')).toBeVisible({ timeout: 30_000 });

		await page.locator('#hamburger-button').click();
		const menu = page.locator('#hamburger-menu');
		await expect(menu).toBeVisible();

		await menu.getByRole('menuitem', { name: 'Drivers' }).click();
		await page.waitForURL('**/drivers', { timeout: 30_000 });

		await expect(page).toHaveURL('/drivers');
		await expect(menu).not.toBeVisible();

		expectNoGraphql(gql);
	});

	test('Past Seasons menu item routes to /seasons', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		await expect(page.locator('#hamburger-button')).toBeVisible({ timeout: 30_000 });

		await page.locator('#hamburger-button').click();
		const menu = page.locator('#hamburger-menu');
		await expect(menu).toBeVisible();

		await menu.getByRole('menuitem', { name: 'Past Seasons' }).click();
		await page.waitForURL('**/seasons', { timeout: 30_000 });

		await expect(page).toHaveURL('/seasons');
		await expect(menu).not.toBeVisible();

		expectNoGraphql(gql);
	});

	test('Circuits menu item routes to /circuits', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		await expect(page.locator('#hamburger-button')).toBeVisible({ timeout: 30_000 });

		await page.locator('#hamburger-button').click();
		const menu = page.locator('#hamburger-menu');
		await expect(menu).toBeVisible();

		await menu.getByRole('menuitem', { name: 'Circuits' }).click();
		await page.waitForURL('**/circuits', { timeout: 30_000 });

		await expect(page).toHaveURL('/circuits');
		await expect(menu).not.toBeVisible();

		expectNoGraphql(gql);
	});

	test('Constructors menu item routes to /constructors', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		await expect(page.locator('#hamburger-button')).toBeVisible({ timeout: 30_000 });

		await page.locator('#hamburger-button').click();
		const menu = page.locator('#hamburger-menu');
		await expect(menu).toBeVisible();

		await menu.getByRole('menuitem', { name: 'Constructors' }).click();
		await page.waitForURL('**/constructors', { timeout: 30_000 });

		await expect(page).toHaveURL('/constructors');
		await expect(menu).not.toBeVisible();

		expectNoGraphql(gql);
	});

	test('About menu item routes to /about', async ({ page }) => {
		const gql = trackGraphqlRequests(page);
		await page.goto('/');
		await expect(page.locator('#hamburger-button')).toBeVisible({ timeout: 30_000 });

		await page.locator('#hamburger-button').click();
		const menu = page.locator('#hamburger-menu');
		await expect(menu).toBeVisible();

		await menu.getByRole('menuitem', { name: 'About' }).click();
		await page.waitForURL('**/about', { timeout: 30_000 });

		await expect(page).toHaveURL('/about');
		await expect(menu).not.toBeVisible();

		expectNoGraphql(gql);
	});

	test('inline nav links are not visible at mobile viewport', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('#hamburger-button')).toBeVisible({ timeout: 30_000 });

		// At 390px the "hidden md:contents" Box hides the inline links.
		// Hamburger is visible instead.
		await expect(page.locator('#hamburger-button')).toBeVisible();

		// The inline nav links should not be visible (they exist in DOM but hidden by CSS).
		await expect(page.getByRole('link', { name: 'Past Seasons' })).not.toBeVisible();
	});
});
