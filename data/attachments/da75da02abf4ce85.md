# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance/performance.spec.js >> Performance Tests >> @performance Verify page has no console errors
- Location: tests/performance/performance.spec.js:44:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1
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
      - strong [ref=e22]: 9f350a1d1f0112ce
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
  4  | test.describe('Performance Tests', () => {
  5  |   let pages;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     pages = initPageObjects(page);
  9  |   });
  10 | 
  11 |   test('@performance Measure homepage load time', async ({ page }) => {
  12 |     const startTime = Date.now();
  13 |     await pages.homePage.navigate();
  14 |     const loadTime = Date.now() - startTime;
  15 |     console.log(`Homepage load time: ${loadTime}ms`);
  16 |     expect(loadTime).toBeLessThan(10000);
  17 |   });
  18 | 
  19 |   test('@performance Measure product page load time', async ({ page }) => {
  20 |     const startTime = Date.now();
  21 |     await pages.productPage.navigate('/build-your-own-computer');
  22 |     const loadTime = Date.now() - startTime;
  23 |     console.log(`Product page load time: ${loadTime}ms`);
  24 |     expect(loadTime).toBeLessThan(10000);
  25 |   });
  26 | 
  27 |   test('@performance Measure login page load time', async ({ page }) => {
  28 |     const startTime = Date.now();
  29 |     await pages.loginPage.navigate();
  30 |     const loadTime = Date.now() - startTime;
  31 |     console.log(`Login page load time: ${loadTime}ms`);
  32 |     expect(loadTime).toBeLessThan(10000);
  33 |   });
  34 | 
  35 |   test('@performance Measure API response time for product listing', async ({ page }) => {
  36 |     const startTime = Date.now();
  37 |     await pages.homePage.navigate();
  38 |     const products = await page.locator('.product-grid .item-box').count();
  39 |     const loadTime = Date.now() - startTime;
  40 |     console.log(`Product listing (${products} products) load time: ${loadTime}ms`);
  41 |     expect(loadTime).toBeLessThan(10000);
  42 |   });
  43 | 
  44 |   test('@performance Verify page has no console errors', async ({ page }) => {
  45 |     const errors = [];
  46 |     page.on('console', msg => {
  47 |       if (msg.type() === 'error') errors.push(msg.text());
  48 |     });
  49 |     await pages.homePage.navigate();
> 50 |     expect(errors.length).toBe(0);
     |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  51 |   });
  52 | 
  53 |   test('@performance Measure TTFB', async ({ page }) => {
  54 |     const startTime = Date.now();
  55 |     await pages.homePage.navigate();
  56 |     const ttfb = Date.now() - startTime;
  57 |     console.log(`TTFB: ${ttfb}ms`);
  58 |     expect(ttfb).toBeLessThan(5000);
  59 |   });
  60 | });
```