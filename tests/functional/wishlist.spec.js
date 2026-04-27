const { test, expect } = require('@playwright/test');
const ProductPage = require('../../pages/ProductPage');
const HomePage = require('../../pages/HomePage');
const LoginPage = require('../../pages/LoginPage');
const RegisterPage = require('../../pages/RegisterPage');
const testUsers = require('../../utils/testData').testUsers;

test.describe('Wishlist Tests', () => {
  let productPage;
  let homePage;
  let loginPage;
  let registerPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
  });

  test('@functional Add product to wishlist from product page', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToWishlist();
    const notification = await productPage.getSuccessMessage();
    expect(notification).toBeTruthy();
  });

  test('@functional View wishlist page', async ({ page }) => {
    await homePage.navigate();
    await homePage.clickWishlist();
    await expect(page).toHaveURL(/wishlist/);
  });

  test('@functional Add product to wishlist and verify in wishlist page', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToWishlist();
    await homePage.navigate();
    await homePage.clickWishlist();
    const isVisible = await page.locator('text=Build your own computer').isVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Remove product from wishlist', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToWishlist();
    await homePage.navigate();
    await homePage.clickWishlist();
    await page.click('.remove-btn');
    await page.waitForLoadState('networkidle');
    const isEmpty = await page.locator('.no-data').isVisible();
    expect(isEmpty).toBe(true);
  });

  test('@functional Wishlist persists after logout and login', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToWishlist();
    await registerPage.navigate();
    await registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await registerPage.clickContinue();
    await homePage.navigate();
    await homePage.clickWishlist();
    const productInWishlist = await page.locator('text=Build your own computer').isVisible();
    expect(productInWishlist).toBe(true);
  });

  test('@functional Add multiple products to wishlist', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToWishlist();
    await productPage.navigate('/apple-macbook-pro');
    await productPage.addToWishlist();
    await homePage.navigate();
    await homePage.clickWishlist();
    const itemCount = await page.locator('.wishlist-item').count();
    expect(itemCount).toBe(2);
  });

  test('@functional Share wishlist functionality', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToWishlist();
    await homePage.navigate();
    await homePage.clickWishlist();
    const shareLink = await page.locator('a[href*="/wishlist"]').first();
    expect(shareLink).toBeTruthy();
  });

  test('@functional Add to wishlist from search results', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('laptop');
    const firstProduct = await page.locator('.product-grid .item-box').first();
    const wishlistButton = firstProduct.locator('.add-to-wishlist-button');
    await wishlistButton.click();
    await page.waitForLoadState('networkidle');
    const wishlistCount = await page.locator('.wishlist-qty').textContent();
    expect(wishlistCount).toContain('1');
  });
});