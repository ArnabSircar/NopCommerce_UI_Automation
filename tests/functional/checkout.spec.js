const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Checkout Process Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
    await pages.cartPage.clearCart();
  });

  test('@functional Verify checkout page loads', async ({ page }) => {
    await pages.productPage.navigate('/25-virtual-gift-card');
    await pages.productPage.addToCart();
    await page.waitForTimeout(1000);
    await page.goto('https://demo.nopcommerce.com/cart');
    await expect(page).toHaveURL(/cart/);
  });

  test('@functional Verify checkout button appears when cart has items', async ({ page }) => {
    await pages.productPage.navigate('/25-virtual-gift-card');
    await pages.productPage.addToCart();
    await page.waitForTimeout(1000);
    await pages.homePage.navigate();
    await pages.homePage.clickCart();
    await page.waitForTimeout(1000);
    const checkoutVisible = await page.locator('#checkout').isVisible().catch(() => false);
    expect(checkoutVisible).toBe(true);
  });
});