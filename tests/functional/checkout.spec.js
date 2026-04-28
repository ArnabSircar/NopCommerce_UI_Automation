const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');
const checkoutData = require('../../utils/testData').checkoutData;

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

  test('@functional Fill billing address form', async ({ page }) => {
    await pages.productPage.navigate('/25-virtual-gift-card');
    await pages.productPage.addToCart();
    await page.waitForTimeout(1000);
    await pages.cartPage.acceptTermsOfService();
    await pages.cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
    await pages.checkoutPage.clickGuestCheckout();
    await pages.checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await pages.checkoutPage.clickBillingContinue();
    const isShippingVisible = await pages.checkoutPage.isShippingMethodVisible();
    expect(isShippingVisible).toBe(true);
  });
});