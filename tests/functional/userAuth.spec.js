const { test, expect } = require('@playwright/test');
const RegisterPage = require('../../pages/RegisterPage');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const testUsers = require('../../utils/testData').testUsers;

test.describe('User Authentication Tests', () => {
  let registerPage;
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
  });

  test('@smoke Register new user with valid data', async ({ page }) => {
    await registerPage.navigate();
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    const userData = { ...testUsers.validUser, email: uniqueEmail };
    await registerPage.register(userData);
    const isSuccess = await registerPage.isRegistrationSuccess();
    expect(isSuccess).toBe(true);
  });

  test('@functional Register with invalid email format', async ({ page }) => {
    await registerPage.navigate();
    await registerPage.register(testUsers.invalidEmail);
    const error = await registerPage.getEmailError();
    expect(error).toBeTruthy();
  });

  test('@functional Register with short password', async ({ page }) => {
    await registerPage.navigate();
    await registerPage.register(testUsers.shortPassword);
    const error = await registerPage.getPasswordError();
    expect(error).toBeTruthy();
  });

  test('@functional Register with mismatched passwords', async ({ page }) => {
    await registerPage.navigate();
    await registerPage.register(testUsers.mismatchedPassword);
    const error = await registerPage.getConfirmPasswordError();
    expect(error).toBeTruthy();
  });

  test('@functional Register with empty fields', async ({ page }) => {
    await registerPage.navigate();
    await registerPage.click(registerPage.selectors.registerButton);
    const isVisible = await registerPage.isValidationSummaryVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Navigate from register to login page', async ({ page }) => {
    await registerPage.navigate();
    await registerPage.clickLogin();
    await expect(page).toHaveURL(/login/);
  });

  test('@smoke Login with valid credentials', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await registerPage.navigate();
    await registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await registerPage.clickContinue();
    await loginPage.navigate();
    await loginPage.login(uniqueEmail, testUsers.validUser.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  test('@functional Login with invalid email', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login('invalid@test.com', 'wrongpass');
    const error = await loginPage.getLoginError();
    expect(error).toBeTruthy();
  });

  test('@functional Login with empty credentials', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login('', '');
    const error = await loginPage.getLoginError();
    expect(error).toBeTruthy();
  });

  test('@functional Login with valid email invalid password', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login(testUsers.validUser.email, 'WrongPassword123');
    const error = await loginPage.getLoginError();
    expect(error).toBeTruthy();
  });

  test('@functional Forgot password link works', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/passwordrecovery/);
  });

  test('@functional Logout functionality', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await registerPage.navigate();
    await registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await registerPage.clickContinue();
    await loginPage.logout();
    const isLoggedOut = !(await loginPage.isLoggedIn());
    expect(isLoggedOut).toBe(true);
  });

  test('@functional Login with remember me option', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await registerPage.navigate();
    await registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await registerPage.clickContinue();
    await loginPage.navigate();
    await loginPage.loginWithRememberMe(uniqueEmail, testUsers.validUser.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  test('@functional Register page gender selection', async ({ page }) => {
    await registerPage.navigate();
    await registerPage.selectGender('male');
    const isSelected = await page.locator('#gender-male').isChecked();
    expect(isSelected).toBe(true);
  });
});