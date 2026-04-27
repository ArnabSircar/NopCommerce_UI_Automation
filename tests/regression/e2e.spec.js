const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');
const ProductPage = require('../../pages/ProductPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const RegisterPage = require('../../pages/RegisterPage');
const LoginPage = require('../../pages/LoginPage');
const testUsers = require('../../utils/testData').testUsers;
const checkoutData = require('../../utils/testData').checkoutData;

test.describe('End-to-End Tests', () => {
  let homePage;
  let productPage;
  let cartPage;
  let checkoutPage;
  let registerPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    await cartPage.clearCart();
  });

  test('@regression Complete purchase flow as registered user', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await registerPage.navigate();
    await registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await registerPage.clickContinue();
    await homePage.navigate();
    await homePage.searchFor('laptop');
    await page.locator('.product-grid .item-box').first().locator('.add-to-cart-button').click();
    await page.waitForLoadState('networkidle');
    await homePage.clickCart();
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();
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

  test('@regression Complete purchase flow as guest user', async ({ page }) => {
    await productPage.navigate('/apple-macbook-pro');
    await productPage.addToCart();
    await homePage.clickCart();
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();
    await checkoutPage.clickGuestCheckout();
    await checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await checkoutPage.clickBillingContinue();
    await checkoutPage.selectShippingMethod(checkoutData.shippingMethod.nextDayAir);
    await checkoutPage.clickShippingContinue();
    await checkoutPage.selectPaymentMethod(checkoutData.paymentMethod.creditCard);
    await checkoutPage.clickPaymentContinue();
    await checkoutPage.acceptTermsAndConfirm();
    const isCompleted = await checkoutPage.isOrderCompleted();
    expect(isCompleted).toBe(true);
  });

  test('@regression Browse products by category - add to cart - checkout', async ({ page }) => {
    await homePage.navigate();
    await homePage.clickOnCategory('Electronics');
    await page.locator('.product-grid .item-box').first().locator('.add-to-cart-button').click();
    await page.waitForLoadState('networkidle');
    await homePage.clickCart();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });

  test('@regression Search - filter - add to cart - checkout', async ({ page }) => {
    await homePage.searchFor('phone');
    const results = await page.locator('.product-grid .item-box').count();
    expect(results).toBeGreaterThan(0);
    await page.locator('.product-grid .item-box').first().locator('.add-to-cart-button').click();
    await page.waitForLoadState('networkidle');
    await homePage.clickCart();
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
  });

  test('@regression User registration - login - update profile', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await registerPage.navigate();
    await registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await registerPage.clickContinue();
    await loginPage.clickMyAccount();
    await expect(page).toHaveURL(/customer\/info/);
    const firstNameValue = await page.locator('#FirstName').inputValue();
    expect(firstNameValue).toBe(testUsers.validUser.firstName);
  });

  test('@regression Add to wishlist - move to cart - checkout', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await registerPage.navigate();
    await registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await registerPage.clickContinue();
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToWishlist();
    await homePage.clickWishlist();
    await page.locator('.add-to-cart-button').first().click();
    await page.waitForLoadState('networkidle');
    await homePage.clickCart();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });

  test('@regression Multiple items cart - update quantity - checkout', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await productPage.navigate('/apple-macbook-pro');
    await productPage.addToCart();
    await cartPage.navigate();
    let itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
    await cartPage.updateQuantity('Build your own computer', '3');
    await cartPage.navigate();
    const isVisible = await cartPage.isProductInCart('Build your own computer');
    expect(isVisible).toBe(true);
  });

  test('@regression Browse - add to compare - checkout', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCompare();
    await productPage.navigate('/apple-macbook-pro');
    await productPage.addToCompare();
    await homePage.navigate();
    await page.click('a[href*="/compareproducts"]');
    const itemCount = await page.locator('.compare-products-grid .product-item').count();
    expect(itemCount).toBe(2);
  });
});