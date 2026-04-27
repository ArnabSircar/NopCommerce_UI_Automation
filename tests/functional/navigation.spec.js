const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');
const Footer = require('../../components/Footer');
const Header = require('../../components/Header');

test.describe('Navigation Tests', () => {
  let homePage;
  let footer;
  let header;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    footer = new Footer(page);
    header = new Header(page);
    await homePage.navigate();
  });

  test('@functional Verify footer is visible', async ({ page }) => {
    const isVisible = await footer.isFooterVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Verify header is visible', async ({ page }) => {
    const isVisible = await header.isLogoVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional Navigate to sitemap', async ({ page }) => {
    await footer.clickSitemap();
    await expect(page).toHaveURL(/sitemap/);
  });

  test('@functional Navigate to shipping & returns', async ({ page }) => {
    await footer.clickShippingReturns();
    await expect(page).toHaveURL(/shipping-returns/);
  });

  test('@functional Navigate to privacy notice', async ({ page }) => {
    await footer.clickPrivacyNotice();
    await expect(page).toHaveURL(/privacy-notice/);
  });

  test('@functional Navigate to conditions of use', async ({ page }) => {
    await footer.clickConditionsOfUse();
    await expect(page).toHaveURL(/conditions-of-use/);
  });

  test('@functional Navigate to about us', async ({ page }) => {
    await footer.clickAboutUs();
    await expect(page).toHaveURL(/about-us/);
  });

  test('@functional Navigate to contact us', async ({ page }) => {
    await footer.clickContactUs();
    await expect(page).toHaveURL(/contactus/);
  });

  test('@functional Navigate to news page', async ({ page }) => {
    await footer.clickNews();
    await expect(page).toHaveURL(/news/);
  });

  test('@functional Verify footer links are displayed', async ({ page }) => {
    const links = await footer.getAllInformationLinks();
    expect(links.length).toBeGreaterThan(0);
  });

  test('@functional Verify social media links are visible', async ({ page }) => {
    const isFacebookVisible = await footer.isFacebookLinkVisible();
    expect(isFacebookVisible).toBe(true);
  });

  test('@functional Verify Twitter link is visible', async ({ page }) => {
    const isTwitterVisible = await footer.isTwitterLinkVisible();
    expect(isTwitterVisible).toBe(true);
  });

  test('@functional Navigate to category via header menu', async ({ page }) => {
    await page.hover('.header-menu > ul > li:first-child');
    await page.click('.header-menu a[href*="/computers"]');
    await expect(page).toHaveURL(/computers/);
  });

  test('@functional Navigate to category via header menu - Electronics', async ({ page }) => {
    await page.hover('.header-menu > ul > li:nth-child(2)');
    await page.click('.header-menu a[href*="/electronics"]');
    await expect(page).toHaveURL(/electronics/);
  });
});