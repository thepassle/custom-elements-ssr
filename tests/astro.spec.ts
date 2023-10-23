import { test, expect } from '@playwright/test';

// Test if Astro is working in all three operation modes
// using this integration module

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


test('Astro Dev-Server', async ({ page }) => {
  await page.goto('localhost:4322/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Astro/);

  // vanilla Astro page shouldn't include any JS code.
  // Even polyfill scripts for DSD handling should only
  // be shipped, if DSD is used by the particular page.
  const script_tags = await page.evaluate(
    () => document.querySelectorAll("script").length);
  expect.soft(script_tags,
    'Number of scripts should be One for Dev-Server').toEqual(1);
});

test('Astro SSR-Server', async ({ page }) => {
  await page.goto('localhost:4323/');

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