import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const baseURL =
  process.env.BASE_URL || 'https://gray-pond-07b588403.3.azurestaticapps.net/';

test('Accessibility test', async ({ page }) => {
  await Promise.all([
    await page.goto(baseURL, {
    timeout: 0,
    waitUntil: 'domcontentloaded'
  }),
  await expect(page).toHaveTitle(/Explore spa/)
  ]);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a'])
    .setLegacyMode()
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
