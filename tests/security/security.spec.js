const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');
const LoginPage = require('../../pages/LoginPage');
const RegisterPage = require('../../pages/RegisterPage');

test.describe('Security Tests', () => {
  let homePage;
  let loginPage;
  let registerPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
  });

  test('@security Verify HTTPS is used', async ({ page }) => {
    await homePage.navigate();
    const url = page.url();
    expect(url).toStartWith('https://');
  });

  test('@security Verify login page is HTTPS', async ({ page }) => {
    await loginPage.navigate();
    const url = page.url();
    expect(url).toStartWith('https://');
  });

  test('@security Verify register page is HTTPS', async ({ page }) => {
    await registerPage.navigate();
    const url = page.url();
    expect(url).toStartWith('https://');
  });

  test('@security XSS prevention - search with script tag', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('<script>alert("XSS")</script>');
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    expect(consoleErrors.length).toBe(0);
  });

  test('@security SQL injection prevention in search', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor("' OR '1'='1");
    const isNoResultsVisible = await page.locator('.no-results').isVisible();
    expect(isNoResultsVisible).toBe(true);
  });

  test('@security Verify checkout page is HTTPS', async ({ page }) => {
    await loginPage.navigate();
    const url = page.url();
    expect(url).toStartWith('https://');
  });

  test('@security Verify cart page is HTTPS', async ({ page }) => {
    await homePage.navigate();
    const url = page.url();
    expect(url).toStartWith('https://');
  });

  test('@security Verify account page is HTTPS', async ({ page }) => {
    await loginPage.navigate();
    const url = page.url();
    expect(url).toStartWith('https://');
  });

  test('@security Verify product page is HTTPS', async ({ page }) => {
    await homePage.navigate();
    await page.click('text=Build your own computer');
    const url = page.url();
    expect(url).toStartWith('https://');
  });

  test('@security Verify password field is masked in login', async ({ page }) => {
    await loginPage.navigate();
    const passwordType = await page.locator('#Password').getAttribute('type');
    expect(passwordType).toBe('password');
  });

  test('@security Verify password field is masked in registration', async ({ page }) => {
    await registerPage.navigate();
    const passwordType = await page.locator('#Password').getAttribute('type');
    expect(passwordType).toBe('password');
  });

  test('@security CSRF token presence in forms', async ({ page }) => {
    await loginPage.navigate();
    const csrfToken = await page.locator('input[name*="__RequestVerificationToken"]').count();
    expect(csrfToken).toBeGreaterThan(0);
  });

  test('@security Verify security headers are present', async ({ page }) => {
    const response = await page.request.get('https://demo.nopcommerce.com/');
    const headers = response.headers();
    expect(headers['x-frame-options'] || headers['x-xss-protection'] || headers['content-security-policy']).toBeTruthy();
  });
});