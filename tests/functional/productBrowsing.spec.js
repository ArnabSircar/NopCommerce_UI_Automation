const { test, expect } = require('@playwright/test');
const ProductPage = require('../../pages/ProductPage');
const HomePage = require('../../pages/HomePage');

test.describe('Product Browsing Tests', () => {
  let productPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    homePage = new HomePage(page);
  });

  test('@smoke View product details - Build your own computer', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    const title = await productPage.getProductTitle();
    expect(title).toBeTruthy();
  });

  test('@smoke Verify product price is displayed', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    const price = await productPage.getProductPrice();
    expect(price).toBeTruthy();
  });

  test('@functional Verify product description is displayed', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    const description = await productPage.getProductDescription();
    expect(description).toBeTruthy();
  });

  test('@functional Verify add to cart button is visible', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    const isVisible = await productPage.isAddToCartVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Verify add to wishlist button is visible', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    const isVisible = await productPage.isAddToWishlistVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Verify add to compare button is visible', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    const isVisible = await productPage.isAddToCompareVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Navigate through breadcrumb', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    const breadcrumbs = await productPage.getBreadcrumb();
    expect(breadcrumbs.length).toBeGreaterThan(0);
  });

  test('@functional Click on product image changes main image', async ({ page }) => {
    await productPage.navigate('/apple-macbook-pro');
    const initialSrc = await productPage.getMainImageSrc();
    await productPage.changeProductImage(0);
    const newSrc = await productPage.getMainImageSrc();
    expect(newSrc).toBeTruthy();
  });

  test('@functional Verify review link is visible', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    const isVisible = await productPage.isReviewLinkVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional View Apple MacBook Pro product', async ({ page }) => {
    await productPage.navigate('/apple-macbook-pro');
    const title = await productPage.getProductTitle();
    expect(title).toContain('Apple MacBook Pro');
  });

  test('@functional View HTC smartphone product', async ({ page }) => {
    await productPage.navigate('/htc-smartphone');
    const title = await productPage.getProductTitle();
    expect(title).toContain('HTC');
  });

  test('@functional View Gift Card product', async ({ page }) => {
    await productPage.navigate('/25-virtual-gift-card');
    const title = await productPage.getProductTitle();
    expect(title).toBeTruthy();
  });

  test('@functional Navigate to electronics category', async ({ page }) => {
    await productPage.navigate('/electronics');
    await expect(page).toHaveURL(/electronics/);
  });

  test('@functional Navigate to computers category', async ({ page }) => {
    await productPage.navigate('/computers');
    await expect(page).toHaveURL(/computers/);
  });
});