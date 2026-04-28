const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Security Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
  });

  test('@security HTTPS on homepage', async ({ page }) => {
    await pages.homePage.navigate();
    const url = page.url();
    expect(url).toContain('https://');
  });

  test('@security HTTPS on login page', async ({ page }) => {
    await pages.loginPage.navigate();
    const url = page.url();
    expect(url).toContain('https://');
  });

  test('@security HTTPS on register page', async ({ page }) => {
    await pages.registerPage.navigate();
    const url = page.url();
    expect(url).toContain('https://');
  });

  test('@security Password masked in login', async ({ page }) => {
    await pages.loginPage.navigate();
    const passwordType = await page.locator('#Password').getAttribute('type');
    expect(passwordType).toBe('password');
  });

  test('@security Password masked in registration', async ({ page }) => {
    await pages.registerPage.navigate();
    const passwordType = await page.locator('#Password').getAttribute('type');
    expect(passwordType).toBe('password');
  });

  test('@security CSRF token present in forms', async ({ page }) => {
    await pages.loginPage.navigate();
    const csrfToken = await page.locator('input[name*="__RequestVerificationToken"]').count();
    expect(csrfToken).toBeGreaterThan(0);
  });
});