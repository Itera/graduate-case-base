import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const baseURL =
  process.env.BASE_URL ||
  'https://lively-flower-010ee8e03.3.azurestaticapps.net/';

test('Accessibility test', async ({ page }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/Explore excursion/);
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a'])
    .setLegacyMode()
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
