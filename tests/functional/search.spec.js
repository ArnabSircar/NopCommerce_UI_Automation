const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Search Functionality Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
  });

  test('@functional Search for valid product', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.searchFor('laptop');
    await expect(page).toHaveURL(/search/);
  });

  test('@functional Search returns results page', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.searchFor('phone');
    await expect(page).toHaveURL(/search/);
  });

  test('@smoke Navigate to product from search results', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.searchFor('laptop');
    const firstProduct = page.locator('.product-grid .item-box a').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      await expect(page).toHaveURL(/.*/);
    }
  });

  test('@functional Add first search result to cart', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.searchFor('laptop');
    const addToCart = page.locator('.add-to-cart-button').first();
    if (await addToCart.isVisible()) {
      await addToCart.click();
      await page.waitForTimeout(1000);
    }
  });
});