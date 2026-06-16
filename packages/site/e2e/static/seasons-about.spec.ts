import { test, expect } from '@playwright/test';
import { trackGraphqlRequests, expectNoGraphql } from '../fixtures/no-graphql';

test.describe('Section 12 — Static Pages (Past Seasons + About)', () => {
	test.describe('12.1 Past Seasons page renders and links to season pages', () => {
		test('renders heading and season list with zero client GraphQL', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/seasons');

			// Heading
			const heading = page.getByRole('heading', { name: /past seasons/i });
			await expect(heading).toBeVisible({ timeout: 30_000 });

			// At least one season year link must be present (links to '/<year>')
			const seasonLinks = page.getByRole('link', { name: /^\d{4}$/ });
			await expect(seasonLinks.first()).toBeVisible();

			// Zero browser-side GraphQL
			expectNoGraphql(gql);
		});

		test('clicking a past season (2024) navigates to /2024 Season page', async ({ page }) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/seasons');
			// Wait for page to be ready
			await expect(page.getByRole('heading', { name: /past seasons/i })).toBeVisible({ timeout: 30_000 });

			// Find a link whose visible label is "2024"
			const link2024 = page.getByRole('link', { name: '2024' });
			await expect(link2024.first()).toBeVisible();

			await link2024.first().click();
			await page.waitForURL('**/2024', { timeout: 30_000 });

			// Season page heading
			const seasonHeading = page.getByRole('heading', { name: /2024 season/i });
			await expect(seasonHeading).toBeVisible({ timeout: 15_000 });

			// Still no client GraphQL after navigation
			expectNoGraphql(gql);
		});
	});

	test.describe('12.2 About page renders all required sections', () => {
		test('renders heading, Mission, Data, Repositories, Dependencies — no client GraphQL', async ({
			page,
		}) => {
			const gql = trackGraphqlRequests(page);

			await page.goto('/about');

			// Primary heading
			const heading = page.getByRole('heading', { name: /about effone hub/i });
			await expect(heading).toBeVisible({ timeout: 30_000 });

			// Required content sections — each must have visible text on the page
			await expect(page.getByText(/mission/i).first()).toBeVisible();
			await expect(page.getByText(/data/i).first()).toBeVisible();
			await expect(page.getByText(/repositor/i).first()).toBeVisible();
			await expect(page.getByText(/dependenc/i).first()).toBeVisible();

			// Zero browser-side GraphQL
			expectNoGraphql(gql);
		});
	});
});
