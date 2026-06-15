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
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry'
	},
	webServer: {
		command: 'pnpm site:dev',
		url: 'http://localhost:3000',
		reuseExistingServer: true,
		timeout: 120_000
	}
});
