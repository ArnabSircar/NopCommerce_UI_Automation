const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Product Browsing Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
  });

  test('@smoke View product details - Build your own computer', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    const title = await pages.productPage.getProductTitle().catch(() => '');
    expect(title).toBeTruthy();
  });

  test('@smoke Verify product price is displayed', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    const price = await pages.productPage.getProductPrice().catch(() => '');
    expect(price).toBeTruthy();
  });

  test('@functional Verify add to cart button is visible', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    const isVisible = await pages.productPage.isAddToCartVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Verify add to wishlist button is visible', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    const isVisible = await pages.productPage.isAddToWishlistVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Navigate through breadcrumb', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    const breadcrumbs = await pages.productPage.getBreadcrumb();
    expect(breadcrumbs.length).toBeGreaterThan(0);
  });

  test('@functional View Apple MacBook Pro product', async ({ page }) => {
    await pages.productPage.navigate('/apple-macbook-pro');
    const title = await pages.productPage.getProductTitle().catch(() => '');
    expect(title).toBeTruthy();
  });

  test('@functional View HTC smartphone product', async ({ page }) => {
    await pages.productPage.navigate('/htc-smartphone');
    const title = await pages.productPage.getProductTitle().catch(() => '');
    expect(title).toBeTruthy();
  });

  test('@functional View Gift Card product', async ({ page }) => {
    await pages.productPage.navigate('/25-virtual-gift-card');
    const title = await pages.productPage.getProductTitle().catch(() => '');
    expect(title).toBeTruthy();
  });

  test('@functional Navigate to electronics category', async ({ page }) => {
    await pages.productPage.navigate('/electronics');
    await expect(page).toHaveURL(/electronics/);
  });

  test('@functional Navigate to computers category', async ({ page }) => {
    await pages.productPage.navigate('/computers');
    await expect(page).toHaveURL(/computers/);
  });
});