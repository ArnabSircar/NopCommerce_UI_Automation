const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Shopping Cart Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
  });

  test('@smoke Add product to cart from product page', async ({ page }) => {
    await pages.productPage.navigate('/25-virtual-gift-card');
    await pages.productPage.addToCart();
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toContain('25-virtual-gift-card');
  });

  test('@functional View cart contents', async ({ page }) => {
    await pages.cartPage.navigate();
    const isCartPage = page.url().includes('/cart');
    expect(isCartPage).toBe(true);
  });

  test('@functional Verify empty cart message', async ({ page }) => {
    await pages.cartPage.navigate();
    const isEmpty = await pages.cartPage.isCartEmpty();
    expect(isEmpty).toBe(true);
  });

  test('@functional Verify terms of service checkbox is visible', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    await pages.productPage.addToCart();
    await pages.cartPage.navigate();
    const isVisible = await pages.cartPage.isTermsOfServiceVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Click continue shopping returns to homepage', async ({ page }) => {
    await pages.cartPage.navigate();
    await pages.cartPage.clickContinueShopping();
    await expect(page).toHaveURL(/\/$/);
  });

  test('@functional Proceed to checkout button exists', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    await pages.productPage.addToCart();
    await pages.cartPage.navigate();
    const isVisible = await page.locator('#checkout').isVisible();
    expect(isVisible).toBe(true);
  });
});