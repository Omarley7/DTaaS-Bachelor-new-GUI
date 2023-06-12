// src: https://playwright.dev/docs/writing-tests

import { test, expect } from '@playwright/test';
import links from './Links.ts'; // Extension is required with Playwright import

test.describe('Menu Links from first page (Layout)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await page.getByRole('textbox', { name: 'username' }).fill('user-test');
    await page.getByRole('button').filter({ hasText: 'Sign In' }).click();
  });

  test('Menu Links are visible', async ({ page }) => {
    await links.reduce(async (previousPromise, link) => {
      await previousPromise;
      const linkElement = await page
        .getByRole('button')
        .filter({ hasText: link.text });
      await expect(linkElement).toBeVisible();
    }, Promise.resolve());
  });

  test('Menu Links are clickable', async ({ page }) => {
    await links.reduce(async (previousPromise, link) => {
      await previousPromise;
      await page.getByRole('button').filter({ hasText: link.text }).click();
      await expect(page).toHaveURL(link.url);
      await expect(page.getByText('404 Not Found')).not.toBeVisible();
    }, Promise.resolve());
  });
});
