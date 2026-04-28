const { test, expect } = require('@playwright/test');
const { initPageObjects } = require('../../utils/pageObjects');

test.describe('Navigation Tests', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = initPageObjects(page);
    await pages.homePage.navigate();
  });

  test('@functional Verify footer is visible', async ({ page }) => {
    const isVisible = await pages.footer.isFooterVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Verify header is visible', async ({ page }) => {
    const isVisible = await pages.header.isLogoVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Navigate to sitemap', async ({ page }) => {
    await pages.footer.clickSitemap();
    await expect(page).toHaveURL(/sitemap/);
  });

  test('@functional Navigate to shipping & returns', async ({ page }) => {
    await pages.footer.clickShippingReturns();
    await expect(page).toHaveURL(/shipping-returns/);
  });

  test('@functional Navigate to privacy notice', async ({ page }) => {
    await pages.footer.clickPrivacyNotice();
    await expect(page).toHaveURL(/privacy-notice/);
  });

  test('@functional Navigate to conditions of use', async ({ page }) => {
    await pages.footer.clickConditionsOfUse();
    await expect(page).toHaveURL(/conditions-of-use/);
  });

  test('@functional Navigate to about us', async ({ page }) => {
    await pages.footer.clickAboutUs();
    await expect(page).toHaveURL(/about-us/);
  });

  test('@functional Navigate to contact us', async ({ page }) => {
    await pages.footer.clickContactUs();
    await expect(page).toHaveURL(/contactus/);
  });

  test('@functional Navigate to news page', async ({ page }) => {
    await pages.footer.clickNews();
    await expect(page).toHaveURL(/news/);
  });

  test('@functional Verify footer links are displayed', async ({ page }) => {
    const links = await pages.footer.getAllInformationLinks();
    expect(links.length).toBeGreaterThan(0);
  });

  test('@functional Verify social media links are visible', async ({ page }) => {
    const isFacebookVisible = await pages.footer.isFacebookLinkVisible();
    expect(isFacebookVisible).toBe(true);
  });

  test('@functional Verify Twitter link is visible', async ({ page }) => {
    const isTwitterVisible = await pages.footer.isTwitterLinkVisible();
    expect(isTwitterVisible).toBe(true);
  });
});