const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Homepage Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
    await pages.homePage.navigate();
  });

  test('@functional Verify homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/nopCommerce/);
  });

  test('@functional Verify logo is visible', async ({ page }) => {
    const isVisible = await pages.homePage.isLogoVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Verify search box is visible', async ({ page }) => {
    const isVisible = await pages.homePage.isSearchBoxVisible();
    expect(isVisible).toBe(true);
  });

  test('@smoke Verify featured products are displayed', async ({ page }) => {
    const featuredCount = await pages.homePage.getFeaturedProductsCount();
    expect(featuredCount).toBeGreaterThan(0);
  });

  test('@functional Verify categories are displayed', async ({ page }) => {
    const categoryCount = await pages.homePage.getCategoryCount();
    expect(categoryCount).toBeGreaterThan(0);
  });

  test('@functional Verify welcome message is displayed', async ({ page }) => {
    const message = await pages.homePage.getWelcomeMessage();
    expect(message).toContain('Welcome to our store');
  });

  test('@functional Navigate to Electronics category', async ({ page }) => {
    await pages.homePage.clickOnCategory('Electronics');
    await expect(page).toHaveURL(/electronics/);
  });

  test('@functional Navigate to Apparel category', async ({ page }) => {
    await pages.homePage.clickOnCategory('Apparel');
    await expect(page).toHaveURL(/apparel/);
  });

  test('@smoke Navigate to Register page from homepage', async ({ page }) => {
    await pages.homePage.clickRegister();
    await expect(page).toHaveURL(/\/register/);
  });

  test('@smoke Navigate to Login page from homepage', async ({ page }) => {
    await pages.homePage.clickLogin();
    await expect(page).toHaveURL(/\/login/);
  });

  test('@functional Click on featured product navigates to product page', async ({ page }) => {
    await pages.homePage.clickProductByName('Build your own computer');
    await expect(page).toHaveURL(/build-your-own-computer/);
  });
});