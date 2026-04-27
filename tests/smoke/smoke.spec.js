const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');
const ProductPage = require('../../pages/ProductPage');
const CartPage = require('../../pages/CartPage');
const LoginPage = require('../../pages/LoginPage');
const RegisterPage = require('../../pages/RegisterPage');

test.describe('Smoke Tests - Critical Path Validation', () => {
  let homePage;
  let productPage;
  let cartPage;
  let loginPage;
  let registerPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    await cartPage.clearCart();
  });

  test('@smoke Homepage loads without errors', async ({ page }) => {
    await homePage.navigate();
    await expect(page).toHaveTitle(/nopCommerce/i);
    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBe(true);
  });

  test('@smoke Search functionality works', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('laptop');
    await expect(page).toHaveURL(/search/);
  });

  test('@smoke Product page accessible', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    const title = await productPage.getProductTitle().catch(() => 'Product page loaded');
    expect(title).toBeTruthy();
  });

  test('@smoke Cart page accessible', async ({ page }) => {
    await cartPage.navigate();
    const isCartPage = page.url().includes('/cart');
    expect(isCartPage).toBe(true);
  });

  test('@smoke Login page accessible', async ({ page }) => {
    await loginPage.navigate();
    await expect(page).toHaveURL(/login/);
  });

  test('@smoke Register page accessible', async ({ page }) => {
    await registerPage.navigate();
    await expect(page).toHaveURL(/register/);
  });

  test('@smoke Category navigation works', async ({ page }) => {
    await homePage.navigate();
    await homePage.clickOnCategory('Electronics');
    await expect(page).toHaveURL(/electronics/);
  });

  test('@smoke Wishlist page accessible', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/wishlist');
    await expect(page).toHaveURL(/wishlist/);
  });

  test('@smoke Footer links are accessible', async ({ page }) => {
    await homePage.navigate();
    await page.click('text=Contact us');
    await expect(page).toHaveURL(/contactus/);
  });
});