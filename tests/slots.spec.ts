import { test, expect } from '@playwright/test';

test('Slots', async ({ page }) => {

    await page.goto('/slots');

    // output of first Component
    await expect(page.getByText('Named Slot Text'),
      'Test named slot').toBeVisible();
    await expect(page.getByText('Entry 2'), 
      'Test Slot Hierarchy').toBeVisible();
    await expect(page.getByText('Slotted Light Content'),
      'default light DOM').toBeVisible();

    await expect(page.getByText(/one not found/).nth(1),
      'used slots').toBeHidden();
    await expect(page.getByText(/two not found/).nth(1),
      'missing slots').toBeVisible();
    await expect(page.getByText(/Unknown data/),
      'collect unknown data').toBeVisible();

});
  