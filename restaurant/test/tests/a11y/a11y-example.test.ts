import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const baseURL =
  process.env.BASE_URL || 'https://proud-rock-0a2164603.3.azurestaticapps.net/';

test('Accessibility test', async ({ page }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/Explore restaurant/);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a'])
    .setLegacyMode()
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
