const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');
const testUsers = require('../../utils/testData').testUsers;
const checkoutData = require('../../utils/testData').checkoutData;

test.describe('End-to-End Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
    await pages.cartPage.clearCart();
  });

  test('@regression Complete purchase flow as registered user', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await pages.registerPage.navigate();
    await pages.registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await page.waitForTimeout(2000);
    await pages.homePage.navigate();
    await pages.homePage.searchFor('laptop');
    const addToCart = page.locator('.add-to-cart-button').first();
    if (await addToCart.isVisible()) {
      await addToCart.click();
    }
    await page.waitForTimeout(2000);
    await pages.homePage.clickCart();
    await pages.cartPage.acceptTermsOfService();
    await pages.cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
  });

  test('@regression Browse products by category', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.clickOnCategory('Electronics');
    await expect(page).toHaveURL(/electronics/);
  });

  test('@regression User registration - login - update profile', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await pages.registerPage.navigate();
    await pages.registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await page.waitForTimeout(2000);
    await pages.loginPage.navigate();
    await pages.loginPage.login(uniqueEmail, testUsers.validUser.password);
    await page.waitForTimeout(1000);
  });

  test('@regression Browse - add to compare', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    await pages.productPage.addToCompare();
    await pages.productPage.navigate('/apple-macbook-pro');
    await pages.productPage.addToCompare();
  });
});