const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Performance Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
  });

  test('@performance Measure homepage load time', async ({ page }) => {
    const startTime = Date.now();
    await pages.homePage.navigate();
    const loadTime = Date.now() - startTime;
    console.log(`Homepage load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(10000);
  });

  test('@performance Measure product page load time', async ({ page }) => {
    const startTime = Date.now();
    await pages.productPage.navigate('/build-your-own-computer');
    const loadTime = Date.now() - startTime;
    console.log(`Product page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(10000);
  });

  test('@performance Measure login page load time', async ({ page }) => {
    const startTime = Date.now();
    await pages.loginPage.navigate();
    const loadTime = Date.now() - startTime;
    console.log(`Login page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(10000);
  });

  test('@performance Measure API response time for product listing', async ({ page }) => {
    const startTime = Date.now();
    await pages.homePage.navigate();
    const products = await page.locator('.product-grid .item-box').count();
    const loadTime = Date.now() - startTime;
    console.log(`Product listing (${products} products) load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(10000);
  });

  test('@performance Verify page has no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await pages.homePage.navigate();
    expect(errors.length).toBe(0);
  });

  test('@performance Measure TTFB', async ({ page }) => {
    const startTime = Date.now();
    await pages.homePage.navigate();
    const ttfb = Date.now() - startTime;
    console.log(`TTFB: ${ttfb}ms`);
    expect(ttfb).toBeLessThan(5000);
  });
});