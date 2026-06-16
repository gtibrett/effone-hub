import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:3000', trace: 'on-first-retry' },
  // dev server must be up for SSR data; reuse the running one if present
  webServer: {
    // Use start (pre-built) not dev — dev cold-start takes >2min, exceeds timeout.
    command: 'pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 180_000
  }
});
