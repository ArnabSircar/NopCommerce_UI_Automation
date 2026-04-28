const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');
const testUsers = require('../../utils/testData').testUsers;

test.describe('End-to-End Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
    await pages.cartPage.clearCart();
  });

  test('@regression Browse products by category', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.clickOnCategory('Electronics');
    await expect(page).toHaveURL(/electronics/);
  });

  test('@regression User registration works', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    await pages.registerPage.navigate();
    await pages.registerPage.register({ ...testUsers.validUser, email: uniqueEmail });
    await page.waitForTimeout(2000);
  });

  test('@regression Product page navigation', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    await expect(page).toHaveURL(/build-your-own-computer/);
  });

  test('@regression Search functionality', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.searchFor('laptop');
    await expect(page).toHaveURL(/search/);
  });
});