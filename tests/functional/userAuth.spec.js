const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');
const testUsers = require('../../utils/testData').testUsers;

test.describe('User Authentication Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
  });

  test('@smoke Register new user with valid data', async ({ page }) => {
    await pages.registerPage.navigate();
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    const userData = { ...testUsers.validUser, email: uniqueEmail };
    await pages.registerPage.register(userData);
    await page.waitForTimeout(2000);
  });

  test('@functional Register with invalid email format', async ({ page }) => {
    await pages.registerPage.navigate();
    await pages.registerPage.register(testUsers.invalidEmail);
    const emailError = await pages.registerPage.getEmailError().catch(() => '');
    expect(emailError).toBeTruthy();
  });

  test('@functional Register with short password', async ({ page }) => {
    await pages.registerPage.navigate();
    await pages.registerPage.register(testUsers.shortPassword);
    const passwordError = await pages.registerPage.getPasswordError().catch(() => '');
    expect(passwordError).toBeTruthy();
  });

  test('@functional Register with mismatched passwords', async ({ page }) => {
    await pages.registerPage.navigate();
    await pages.registerPage.register(testUsers.mismatchedPassword);
    const confirmError = await pages.registerPage.getConfirmPasswordError().catch(() => '');
    expect(confirmError).toBeTruthy();
  });

  test('@functional Navigate from register to login page', async ({ page }) => {
    await pages.registerPage.navigate();
    await pages.registerPage.clickLogin();
    await expect(page).toHaveURL(/login/);
  });

  test('@smoke Login with valid credentials', async ({ page }) => {
    await pages.loginPage.navigate();
    await pages.loginPage.login('test@test.com', 'Test@123456');
    await page.waitForTimeout(2000);
  });

  test('@functional Login with invalid email', async ({ page }) => {
    await pages.loginPage.navigate();
    await pages.loginPage.login('invalid@test.com', 'wrongpass');
    const error = await pages.loginPage.getLoginError().catch(() => '');
    expect(error).toBeTruthy();
  });

  test('@functional Forgot password link works', async ({ page }) => {
    await pages.loginPage.navigate();
    await pages.loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/passwordrecovery/);
  });

  test('@functional Register page gender selection', async ({ page }) => {
    await pages.registerPage.navigate();
    await pages.registerPage.selectGender('male');
    const isSelected = await page.locator('#gender-male').isChecked();
    expect(isSelected).toBe(true);
  });
});