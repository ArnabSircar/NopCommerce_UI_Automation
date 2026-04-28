const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Wishlist Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
  });

  test('@functional Add product to wishlist from product page', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    await pages.productPage.addToWishlist();
    await page.waitForTimeout(2000);
  });

  test('@functional View wishlist page', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.clickWishlist();
    await expect(page).toHaveURL(/wishlist/);
  });

  test('@functional Remove product from wishlist', async ({ page }) => {
    await pages.productPage.navigate('/build-your-own-computer');
    await pages.productPage.addToWishlist();
    await page.waitForTimeout(1000);
    await pages.homePage.clickWishlist();
    const removeBtn = page.locator('.remove-btn').first();
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
    }
  });

  test('@functional Add to wishlist from search results', async ({ page }) => {
    await pages.homePage.navigate();
    await pages.homePage.searchFor('laptop');
    const addToWishlist = page.locator('.add-to-wishlist-button').first();
    if (await addToWishlist.isVisible()) {
      await addToWishlist.click();
      await page.waitForTimeout(1000);
    }
  });
});