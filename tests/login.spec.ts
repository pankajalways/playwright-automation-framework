import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../utils/testData';

test.describe('Login Test Suite', () => {

  test('Valid Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate(testData.url);
    await loginPage.login(testData.username, testData.password);

    const successText = await loginPage.getSuccessText();

    await expect(successText).toContain('Logged In Successfully');
  });

  test('Invalid Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate(testData.url);
    await loginPage.login('wrongUser', 'wrongPass');

    await expect(page.locator('#error')).toBeVisible();
  });

});
