import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    baseURL: 'https://front.serverest.dev/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
