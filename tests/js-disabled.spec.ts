import { test, expect } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('Minimal NoScript', async ({ page }) => {

    let count = 0;
    page.on('request', req => {
        /dsd-polyfill/.test(req.url()) && count++;
    });
    await page.goto('/minimal');
    // Although we use more Custom Elements on this page,
    // the DSD polyfill will not be download if JS is disabled.
    expect(count, "Polyfill shouldn't be downloaded in NoScript Mode").toEqual(0)
});
