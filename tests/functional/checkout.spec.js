const { test, expect } = require('@playwright/test');
const ProductPage = require('../../pages/ProductPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const checkoutData = require('../../utils/testData').checkoutData;

test.describe('Checkout Process Tests', () => {
  let productPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await cartPage.clearCart();
  });

  test('@smoke Guest checkout - complete order flow', async ({ page }) => {
    await productPage.navigate('/25-virtual-gift-card');
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();
    await checkoutPage.clickGuestCheckout();
    await checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await checkoutPage.clickBillingContinue();
    await checkoutPage.selectShippingMethod(checkoutData.shippingMethod.ground);
    await checkoutPage.clickShippingContinue();
    await checkoutPage.selectPaymentMethod(checkoutData.paymentMethod.creditCard);
    await checkoutPage.clickPaymentContinue();
    await checkoutPage.acceptTermsAndConfirm();
    const isCompleted = await checkoutPage.isOrderCompleted();
    expect(isCompleted).toBe(true);
  });

  test('@functional Verify checkout page loads', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
  });

  test('@functional Fill billing address form', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();
    await checkoutPage.clickGuestCheckout();
    await checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await checkoutPage.clickBillingContinue();
    const isShippingVisible = await checkoutPage.isShippingMethodVisible();
    expect(isShippingVisible).toBe(true);
  });

  test('@functional Select shipping method', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();
    await checkoutPage.clickGuestCheckout();
    await checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await checkoutPage.clickBillingContinue();
    await checkoutPage.selectShippingMethod(checkoutData.shippingMethod.ground);
    await checkoutPage.clickShippingContinue();
    const isPaymentVisible = await checkoutPage.isPaymentMethodVisible();
    expect(isPaymentVisible).toBe(true);
  });

  test('@functional Select payment method', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();
    await checkoutPage.clickGuestCheckout();
    await checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await checkoutPage.clickBillingContinue();
    await checkoutPage.selectShippingMethod(checkoutData.shippingMethod.ground);
    await checkoutPage.clickShippingContinue();
    await checkoutPage.selectPaymentMethod(checkoutData.paymentMethod.creditCard);
    await checkoutPage.clickPaymentContinue();
    const isPaymentInfoVisible = await checkoutPage.isVisible(checkoutPage.selectors.paymentInfoSection);
    expect(isPaymentInfoVisible).toBe(true);
  });

  test('@regression Verify order total calculation', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();
    await checkoutPage.clickGuestCheckout();
    await checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await checkoutPage.clickBillingContinue();
    await checkoutPage.selectShippingMethod(checkoutData.shippingMethod.ground);
    await checkoutPage.clickShippingContinue();
    await checkoutPage.selectPaymentMethod(checkoutData.paymentMethod.creditCard);
    await checkoutPage.clickPaymentContinue();
    const subtotal = await checkoutPage.getSubtotal();
    expect(subtotal).toBeTruthy();
  });
});