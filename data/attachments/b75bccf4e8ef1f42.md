# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional/navigation.spec.js >> Navigation Tests >> @functional Verify footer is visible
- Location: tests/functional/navigation.spec.js:12:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "Sorry, you have been blocked" [level=1] [ref=e5]
    - heading "You are unable to access nopcommerce.com" [level=2] [ref=e6]
  - generic [ref=e12]:
    - generic [ref=e13]:
      - heading "Why have I been blocked?" [level=2] [ref=e14]
      - paragraph [ref=e15]: This website is using a security service to protect itself from online attacks. The action you just performed triggered the security solution. There are several actions that could trigger this block including submitting a certain word or phrase, a SQL command or malformed data.
    - generic [ref=e16]:
      - heading "What can I do to resolve this?" [level=2] [ref=e17]
      - paragraph [ref=e18]: You can email the site owner to let them know you were blocked. Please include what you were doing when this page came up and the Cloudflare Ray ID found at the bottom of this page.
  - paragraph [ref=e20]:
    - generic [ref=e21]:
      - text: "Cloudflare Ray ID:"
      - strong [ref=e22]: 9f34e108fa45027b
    - generic [ref=e23]: •
    - generic [ref=e24]:
      - text: "Your IP:"
      - button "Click to reveal" [ref=e25] [cursor=pointer]
      - generic [ref=e26]: •
    - generic [ref=e27]:
      - text: Performance & security by
      - link "Cloudflare" [ref=e28] [cursor=pointer]:
        - /url: https://www.cloudflare.com/5xx-error-landing
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { initPageObjects } = require('../../utils/pageObjects');
  3  | 
  4  | test.describe('Navigation Tests', () => {
  5  |   let pages;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     pages = initPageObjects(page);
  9  |     await pages.homePage.navigate();
  10 |   });
  11 | 
  12 |   test('@functional Verify footer is visible', async ({ page }) => {
  13 |     const isVisible = await pages.footer.isFooterVisible();
> 14 |     expect(isVisible).toBe(true);
     |                       ^ Error: expect(received).toBe(expected) // Object.is equality
  15 |   });
  16 | 
  17 |   test('@functional Verify header is visible', async ({ page }) => {
  18 |     const isVisible = await pages.header.isLogoVisible();
  19 |     expect(isVisible).toBe(true);
  20 |   });
  21 | 
  22 |   test('@functional Navigate to sitemap', async ({ page }) => {
  23 |     await pages.footer.clickSitemap();
  24 |     await expect(page).toHaveURL(/sitemap/);
  25 |   });
  26 | 
  27 |   test('@functional Navigate to shipping & returns', async ({ page }) => {
  28 |     await pages.footer.clickShippingReturns();
  29 |     await expect(page).toHaveURL(/shipping-returns/);
  30 |   });
  31 | 
  32 |   test('@functional Navigate to privacy notice', async ({ page }) => {
  33 |     await pages.footer.clickPrivacyNotice();
  34 |     await expect(page).toHaveURL(/privacy-notice/);
  35 |   });
  36 | 
  37 |   test('@functional Navigate to conditions of use', async ({ page }) => {
  38 |     await pages.footer.clickConditionsOfUse();
  39 |     await expect(page).toHaveURL(/conditions-of-use/);
  40 |   });
  41 | 
  42 |   test('@functional Navigate to about us', async ({ page }) => {
  43 |     await pages.footer.clickAboutUs();
  44 |     await expect(page).toHaveURL(/about-us/);
  45 |   });
  46 | 
  47 |   test('@functional Navigate to contact us', async ({ page }) => {
  48 |     await pages.footer.clickContactUs();
  49 |     await expect(page).toHaveURL(/contactus/);
  50 |   });
  51 | 
  52 |   test('@functional Navigate to news page', async ({ page }) => {
  53 |     await pages.footer.clickNews();
  54 |     await expect(page).toHaveURL(/news/);
  55 |   });
  56 | 
  57 |   test('@functional Verify footer links are displayed', async ({ page }) => {
  58 |     const links = await pages.footer.getAllInformationLinks();
  59 |     expect(links.length).toBeGreaterThan(0);
  60 |   });
  61 | 
  62 |   test('@functional Verify social media links are visible', async ({ page }) => {
  63 |     const isFacebookVisible = await pages.footer.isFacebookLinkVisible();
  64 |     expect(isFacebookVisible).toBe(true);
  65 |   });
  66 | 
  67 |   test('@functional Verify Twitter link is visible', async ({ page }) => {
  68 |     const isTwitterVisible = await pages.footer.isTwitterLinkVisible();
  69 |     expect(isTwitterVisible).toBe(true);
  70 |   });
  71 | });
```