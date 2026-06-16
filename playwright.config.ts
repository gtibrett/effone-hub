import { defineConfig } from '@playwright/test';

/**
 * Root Playwright config. The playwright-test MCP launches from the worktree
 * root with no -c, so it auto-discovers THIS config (cwd resolution). webServer
 * is required for the MCP seed to pause-and-hold the page; without it the seed
 * passes and setup reports "seed test not found".
 */
export default defineConfig({
	testDir: 'packages/site/e2e',
	fullyParallel: true,
	// Limit workers: Next.js dev SSR is CPU-bound; too many workers overwhelm
	// the server and cascade into 30s page.goto timeouts. 2 workers are safe.
	workers: 2,
	// 60s per test: networkidle waits on a dev server under parallel load
	// can easily consume 20-30s; 30s (default) leaves no margin.
	timeout: 60_000,
	// One retry absorbs the occasional cold-start / resource-contention timeout.
	retries: 1,
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry'
	},
	webServer: {
		// Dev server (no build step needed). reuseExistingServer short-circuits if
		// :3000 is already up; cold dev compile is slow, hence the 180s boot timeout.
		command: 'pnpm site:dev',
		url: 'http://localhost:3000',
		reuseExistingServer: true,
		timeout: 180_000
	}
});
