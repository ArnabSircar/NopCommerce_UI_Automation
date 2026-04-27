const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');
const ProductPage = require('../../pages/ProductPage');
const CartPage = require('../../pages/CartPage');

test.describe('Shopping Cart Tests', () => {
  let homePage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await cartPage.clearCart();
  });

  test('@smoke Add product to cart from product page', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await homePage.navigate();
    const cartCount = await page.locator('.cart-qty').textContent();
    expect(cartCount).toContain('1');
  });

  test('@smoke Add multiple products to cart', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await productPage.navigate('/apple-macbook-pro');
    await productPage.addToCart();
    await homePage.navigate();
    const cartCount = await page.locator('.cart-qty').textContent();
    expect(cartCount).toContain('2');
  });

  test('@functional View cart contents', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });

  test('@functional Verify cart shows product name', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    const productName = await cartPage.getProductName(0);
    expect(productName).toBeTruthy();
  });

  test('@functional Verify cart shows product price', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    const price = await cartPage.getProductPrice(0);
    expect(price).toBeTruthy();
  });

  test('@functional Update product quantity in cart', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.updateQuantity('Build your own computer', '2');
    await cartPage.navigate();
    const subtotal = await cartPage.getTotal();
    expect(subtotal).toBeTruthy();
  });

  test('@functional Remove product from cart', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.removeProduct('Build your own computer');
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBe(true);
  });

  test('@functional Verify empty cart message', async ({ page }) => {
    await cartPage.navigate();
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBe(true);
  });

  test('@functional Verify terms of service checkbox is visible', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    const isVisible = await cartPage.isTermsOfServiceVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Click continue shopping returns to homepage', async ({ page }) => {
    await cartPage.navigate();
    await cartPage.clickContinueShopping();
    await expect(page).toHaveURL(/\/$/);
  });

  test('@functional Proceed to checkout button exists', async ({ page }) => {
    await productPage.navigate('/build-your-own-computer');
    await productPage.addToCart();
    await cartPage.navigate();
    const isVisible = await page.locator('#checkout').isVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Add product with specific quantity', async ({ page }) => {
    await productPage.navigate('/25-virtual-gift-card');
    await productPage.addToCart(5);
    await cartPage.navigate();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });
});