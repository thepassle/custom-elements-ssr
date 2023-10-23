import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  projects: [
    /* Test against desktop browsers */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:4321',
  },
  webServer: [
    {
      command: 'cd tests-astro-server && pnpm install && pnpm build && pnpm preview',
      stdout: "pipe",
      url: 'http://localhost:4321'
    },
    {
      command: 'cd tests-astro-server && pnpm dev',
      stdout: "pipe",
      url: 'http://localhost:4322'
    },
    {
      command: 'cd tests-astro-server && pnpm build --config astro.config-ssr.mjs && node dist-ssr/dist/server/entry.mjs',
      stdout: "pipe",
      url: 'http://localhost:4323'
    }
  ],
});