const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');
const ProductPage = require('../../pages/ProductPage');
const LoginPage = require('../../pages/LoginPage');
const SearchResultsPage = require('../../pages/SearchResultsPage');

test.describe('Performance Tests', () => {
  let homePage;
  let productPage;
  let loginPage;
  let searchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    loginPage = new LoginPage(page);
    searchPage = new SearchResultsPage(page);
  });

  test('@performance Measure homepage load time', async ({ page }) => {
    const startTime = Date.now();
    await homePage.navigate();
    const loadTime = Date.now() - startTime;
    console.log(`Homepage load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('@performance Measure product page load time', async ({ page }) => {
    const startTime = Date.now();
    await productPage.navigate('/build-your-own-computer');
    const loadTime = Date.now() - startTime;
    console.log(`Product page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('@performance Measure search results load time', async ({ page }) => {
    const startTime = Date.now();
    await homePage.searchFor('laptop');
    await searchPage.hasResults();
    const loadTime = Date.now() - startTime;
    console.log(`Search results load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('@performance Measure login page load time', async ({ page }) => {
    const startTime = Date.now();
    await loginPage.navigate();
    const loadTime = Date.now() - startTime;
    console.log(`Login page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('@performance Measure category page load time', async ({ page }) => {
    const startTime = Date.now();
    await homePage.clickOnCategory('Electronics');
    const loadTime = Date.now() - startTime;
    console.log(`Category page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('@performance Measure cart page load time', async ({ page }) => {
    const startTime = Date.now();
    await homePage.clickCart();
    const loadTime = Date.now() - startTime;
    console.log(`Cart page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('@performance Measure navigation between pages', async ({ page }) => {
    await homePage.navigate();
    const startTime = Date.now();
    await homePage.clickOnCategory('Computers');
    const navTime = Date.now() - startTime;
    console.log(`Navigation time: ${navTime}ms`);
    expect(navTime).toBeLessThan(3000);
  });

  test('@performance Measure API response time for product listing', async ({ page }) => {
    const startTime = Date.now();
    await homePage.navigate();
    const products = await page.locator('.product-grid .item-box').count();
    const loadTime = Date.now() - startTime;
    console.log(`Product listing (${products} products) load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('@performance Verify page has no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await homePage.navigate();
    expect(errors.length).toBe(0);
  });

  test('@performance Measure image lazy loading', async ({ page }) => {
    await homePage.navigate();
    const images = await page.locator('img[loading="lazy"]').count();
    console.log(`Lazy loaded images: ${images}`);
    expect(images).toBeGreaterThan(0);
  });

  test('@performance Measure resource size for homepage', async ({ page }) => {
    const startTime = Date.now();
    await homePage.navigate();
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource').reduce((total, entry) => total + entry.transferSize, 0);
    });
    const loadTime = Date.now() - startTime;
    console.log(`Total resource size: ${(resources / 1024).toFixed(2)} KB`);
    console.log(`Load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(10000);
  });

  test('@performance Measure Time to First Byte (TTFB)', async ({ page }) => {
    const startTime = Date.now();
    await homePage.navigate();
    const ttfb = Date.now() - startTime;
    console.log(`TTFB: ${ttfb}ms`);
    expect(ttfb).toBeLessThan(2000);
  });
});