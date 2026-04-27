const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');
const SearchResultsPage = require('../../pages/SearchResultsPage');

test.describe('Search Functionality Tests', () => {
  let homePage;
  let searchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchResultsPage(page);
  });

  test('@functional Search for valid product', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('laptop');
    const hasResults = await searchPage.hasResults();
    expect(hasResults).toBe(true);
  });

  test('@functional Search for partial term', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('phone');
    const hasResults = await searchPage.hasResults();
    expect(hasResults).toBe(true);
  });

  test('@functional Search returns no results', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('xyz123nonexistent');
    const isNoResultsVisible = await searchPage.isNoResultsVisible();
    expect(isNoResultsVisible).toBe(true);
  });

  test('@functional Search with valid term returns product names', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('computer');
    const names = await searchPage.getProductNames();
    expect(names.length).toBeGreaterThan(0);
  });

  test('@functional Search results display prices', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('laptop');
    const hasResults = await searchPage.hasResults();
    if (hasResults) {
      const prices = await searchPage.getProductPrices();
      expect(prices.length).toBeGreaterThan(0);
    }
  });

  test('@functional Search result count is displayed', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('phone');
    const count = await searchPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('@smoke Navigate to product from search results', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('laptop');
    const names = await searchPage.getProductNames();
    if (names.length > 0) {
      await searchPage.clickProduct(names[0]);
      await expect(page).toHaveURL(/\/[a-z-]+\/$/);
    }
  });

  test('@functional Add first search result to cart', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('laptop');
    const hasResults = await searchPage.hasResults();
    if (hasResults) {
      await searchPage.addFirstProductToCart();
      const cartCount = await page.locator('.cart-qty').textContent();
      expect(cartCount).toContain('1');
    }
  });

  test('@functional Search page displays pagination', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFor('phone');
    const hasPaging = await searchPage.isPagingVisible();
    expect(hasPaging).toBe(true);
  });
});