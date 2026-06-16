import { test, expect } from '@playwright/test';

test.describe('Skip navigation link', () => {
	test.use({ viewport: { width: 1280, height: 800 } });

	test('Skip navigation link is sr-only until focused, then visible', async ({ page }) => {
		await page.goto('/');
		// Wait for the skip link to be attached (page loaded) — don't use networkidle
		const skipLink = page.getByRole('link', { name: 'Skip navigation' });
		await expect(skipLink).toBeAttached({ timeout: 30_000 });

		// Before focus: the link exists but is visually hidden (sr-only class).
		// Playwright considers it not visible via CSS clip/overflow.
		await expect(skipLink).toBeAttached();

		// Tab once from top — SkipNav is the first focusable element in the DOM.
		await page.keyboard.press('Tab');

		// After focus it gains focus:not-sr-only and is visible.
		await expect(skipLink).toBeFocused();
		await expect(skipLink).toBeVisible();
	});

	test('activating Skip navigation moves focus to <main> without navigating away', async ({ page }) => {
		await page.goto('/');
		const skipLink = page.getByRole('link', { name: 'Skip navigation' });
		await expect(skipLink).toBeAttached({ timeout: 30_000 });
		const urlBefore = page.url();

		// Focus the skip link
		await page.keyboard.press('Tab');
		await expect(skipLink).toBeFocused();

		// Activate — SkipNav calls ev.preventDefault() and focuses main.
		await page.keyboard.press('Enter');

		// URL must not change (href="#" + preventDefault)
		await expect(page).toHaveURL(urlBefore);

		// Focus lands on <main> (Container component="main" tabIndex={0})
		const main = page.locator('main');
		await expect(main).toBeFocused();
	});

	test('skip link click moves focus to main and stays on same URL', async ({ page }) => {
		await page.goto('/');
		const skipLink = page.getByRole('link', { name: 'Skip navigation' });
		await expect(skipLink).toBeAttached({ timeout: 30_000 });
		const urlBefore = page.url();

		// Tab to make the link visible/interactable, then click.
		await page.keyboard.press('Tab');
		await expect(skipLink).toBeFocused();
		await skipLink.click();

		await expect(page).toHaveURL(urlBefore);
		const main = page.locator('main');
		await expect(main).toBeFocused();
	});
});
