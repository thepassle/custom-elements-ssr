import { test, expect } from '@playwright/test';

test('Minimal Custom Element', async ({ page }) => {

    let count = 0;
    page.on('request', req => {
      /dsd-polyfill/.test(req.url()) && count++;
    });
    await page.goto('/minimal');
    // Although we use more Custom Elements on this page,
    // the DSD polyfill should be only download once.
    expect(count, "Polyfill should be downloaded only once").toEqual(1);

    await expect(page.getByText('Test-Text in Shadow DOM')).toHaveCount(2);
    await expect(page.getByText('Test-Text without Shadow DOM')).toHaveCount(2);
  });
  