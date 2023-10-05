import { test, expect } from '@playwright/test';

test('Astro Zero-JS', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Astro/);

  // vanilla Astro page shouldn't ship JS
  const script_tags = await page.locator('xpath=//script').count();
  expect.soft(script_tags, 'Number of scripts should be Zero').toEqual(0);
});
