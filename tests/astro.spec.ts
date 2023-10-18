import { test, expect } from '@playwright/test';

test('Astro Zero-JS', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Astro/);

  // vanilla Astro page shouldn't include any JS code.
  // Even polyfill scripts for DSD handling should only
  // be shipped, if DSD is used by the particular page.
  const script_tags = await page.evaluate(
    () => document.querySelectorAll("script").length);
  expect.soft(script_tags,
    'Number of scripts should be Zero').toEqual(0);
});

