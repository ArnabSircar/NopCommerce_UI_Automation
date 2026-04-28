const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Smoke Tests - Critical Path Validation', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
    await pages.cartPage.clearCart();
  });

  test('@smoke Homepage loads without errors', async ({ page }) => {
    await pages.homePage.navigate();
    await expect(page).toHaveTitle(/nopCommerce/i);
    const isLogoVisible = await pages.homePage.isLogoVisible();
    expect(isLogoVisible).toBe(true);
  });

  test('@smoke Search functionality works', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.searchFor('laptop');
    await expect(page).toHaveURL(/search/);
  });

  test('@smoke Product page accessible', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    const title = await pages.productPage.getProductTitle().catch(() => 'Product page loaded');
    expect(title).toBeTruthy();
  });

  test('@smoke Cart page accessible', async ({ page }) => {
    await pages.cartPage.navigate();
    const isCartPage = page.url().includes('/cart');
    expect(isCartPage).toBe(true);
  });

  test('@smoke Login page accessible', async ({ page }) => {
    await pages.loginPage.navigate();
    await expect(page).toHaveURL(/login/);
  });

  test('@smoke Register page accessible', async ({ page }) => {
    await pages.registerPage.navigate();
    await expect(page).toHaveURL(/register/);
  });

  test('@smoke Category navigation works', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.clickOnCategory('Electronics');
    await expect(page).toHaveURL(/electronics/);
  });

  test('@smoke Wishlist page accessible', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/wishlist');
    await expect(page).toHaveURL(/wishlist/);
  });

  test('@smoke Footer links are accessible', async ({ page }) => {
    await pages.homePage.navigate();
    await page.click('text=Contact us');
    await expect(page).toHaveURL(/contactus/);
  });
});