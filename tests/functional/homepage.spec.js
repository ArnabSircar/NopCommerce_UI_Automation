const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');
const { BASE_URL } = require('../../utils/constants');

test.describe('Homepage Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('@functional Verify homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/nopCommerce/);
  });

  test('@functional Verify logo is visible', async ({ page }) => {
    const isVisible = await homePage.isLogoVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Verify search box is visible', async ({ page }) => {
    const isVisible = await homePage.isSearchBoxVisible();
    expect(isVisible).toBe(true);
  });

  test('@smoke Verify featured products are displayed', async ({ page }) => {
    const featuredCount = await homePage.getFeaturedProductsCount();
    expect(featuredCount).toBeGreaterThan(0);
  });

  test('@functional Verify categories are displayed', async ({ page }) => {
    const categoryCount = await homePage.getCategoryCount();
    expect(categoryCount).toBeGreaterThan(0);
  });

  test('@functional Verify welcome message is displayed', async ({ page }) => {
    const message = await homePage.getWelcomeMessage();
    expect(message).toContain('Welcome to our store');
  });

  test('@functional Verify Computers category is visible', async ({ page }) => {
    const isVisible = await homePage.isComputersCategoryVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Verify Electronics category is visible', async ({ page }) => {
    const isVisible = await homePage.isElectronicsCategoryVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Navigate to Computers category', async ({ page }) => {
    await homePage.clickOnCategory('Computers');
    await expect(page).toHaveURL(/computers/);
  });

  test('@functional Navigate to Electronics category', async ({ page }) => {
    await homePage.clickOnCategory('Electronics');
    await expect(page).toHaveURL(/electronics/);
  });

  test('@functional Navigate to Apparel category', async ({ page }) => {
    await homePage.clickOnCategory('Apparel');
    await expect(page).toHaveURL(/apparel/);
  });

  test('@smoke Navigate to Register page from homepage', async ({ page }) => {
    await homePage.clickRegister();
    await expect(page).toHaveURL(/\/register/);
  });

  test('@smoke Navigate to Login page from homepage', async ({ page }) => {
    await homePage.clickLogin();
    await expect(page).toHaveURL(/\/login/);
  });

  test('@functional Newsletter subscription with valid email', async ({ page }) => {
    await homePage.subscribeNewsletter('test@example.com');
    const isSubscribed = await homePage.isNewsletterSubscribed();
    expect(isSubscribed).toBe(true);
  });

  test('@functional Newsletter subscription with invalid email', async ({ page }) => {
    await homePage.subscribeNewsletter('invalid-email');
    const errorMessage = await page.locator('.newsletter-error').textContent();
    expect(errorMessage).toBeTruthy();
  });

  test('@functional Click on featured product navigates to product page', async ({ page }) => {
    await homePage.clickProductByName('Build your own computer');
    await expect(page).toHaveURL(/build-your-own-computer/);
  });
});