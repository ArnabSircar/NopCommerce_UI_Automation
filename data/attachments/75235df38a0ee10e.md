# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional\navigation.spec.js >> Navigation Tests >> @functional Navigate to category via header menu
- Location: tests\functional\navigation.spec.js:78:3

# Error details

```
TimeoutError: page.hover: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('.header-menu > ul > li:first-child')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - status
  - generic [ref=e2]:
    - banner [ref=e3]:
      - link "Skip navigation" [ref=e4] [cursor=pointer]:
        - /url: "#main"
      - generic [ref=e5]:
        - combobox "Currency selector" [ref=e8]:
          - option "US Dollar" [selected]
          - option "Euro"
        - list [ref=e11]:
          - listitem [ref=e12]:
            - link "Register" [ref=e13] [cursor=pointer]:
              - /url: /register?returnUrl=%2F
          - listitem [ref=e14]:
            - link "Log in" [ref=e15] [cursor=pointer]:
              - /url: /login?returnUrl=%2F
          - listitem [ref=e16]:
            - link "Wishlist (0)" [ref=e17] [cursor=pointer]:
              - /url: /wishlist
              - generic [ref=e18]: Wishlist
              - generic [ref=e19]: (0)
          - listitem [ref=e20]:
            - link "Shopping cart (0)" [ref=e21] [cursor=pointer]:
              - /url: /cart
              - generic [ref=e22]: Shopping cart
              - generic [ref=e23]: (0)
      - generic [ref=e24]:
        - link "nopCommerce demo store" [ref=e26] [cursor=pointer]:
          - /url: /
          - img "nopCommerce demo store" [ref=e27]
        - search [ref=e28]:
          - generic [ref=e29]:
            - textbox "Search store" [ref=e30]
            - button "Search" [ref=e31] [cursor=pointer]
    - navigation [ref=e33]:
      - menu "Categories" [ref=e34]:
        - menuitem "Computers" [ref=e35]:
          - button "Computers" [ref=e37] [cursor=pointer]
        - menuitem "Electronics" [ref=e38]:
          - button "Electronics" [ref=e40] [cursor=pointer]
        - menuitem "Apparel" [ref=e41]:
          - button "Apparel" [ref=e43] [cursor=pointer]
        - menuitem "Digital downloads" [ref=e44]:
          - button "Digital downloads" [ref=e45] [cursor=pointer]
        - menuitem "Books" [ref=e46]:
          - button "Books" [ref=e47] [cursor=pointer]
        - menuitem "Jewelry" [ref=e48]:
          - button "Jewelry" [ref=e49] [cursor=pointer]
        - menuitem "Gift Cards" [ref=e50]:
          - button "Gift Cards" [ref=e51] [cursor=pointer]
    - main [ref=e52]:
      - generic [ref=e56]:
        - generic [ref=e57]:
          - generic [ref=e58]:
            - group "1 / 2" [ref=e59]:
              - link [ref=e60] [cursor=pointer]:
                - /url: https://demo.nopcommerce.com/apple-iphone-16-128gb
                - img [ref=e61]
            - group "2 / 2":
              - link:
                - /url: https://demo.nopcommerce.com/samsung-galaxy-s24-256gb
                - img
          - generic [ref=e62]:
            - button "Go to slide 1" [ref=e63] [cursor=pointer]
            - button "Go to slide 2" [ref=e64] [cursor=pointer]
        - generic [ref=e65]:
          - heading "Welcome to our store" [level=2] [ref=e67]
          - generic [ref=e68]:
            - paragraph [ref=e69]: Online shopping is the process consumers go through to purchase products or services over the Internet. You can edit this in the admin site.
            - paragraph [ref=e70]:
              - text: If you have questions, see the
              - link "Documentation" [ref=e71] [cursor=pointer]:
                - /url: http://docs.nopcommerce.com/
              - text: ", or post in the"
              - link "Forums" [ref=e72] [cursor=pointer]:
                - /url: https://www.nopcommerce.com/boards/
              - text: at
              - link "nopCommerce.com" [ref=e73] [cursor=pointer]:
                - /url: https://www.nopcommerce.com
        - generic [ref=e75]:
          - article [ref=e76]:
            - heading "Electronics" [level=2] [ref=e77]:
              - link "Electronics" [ref=e78] [cursor=pointer]:
                - /url: /electronics
            - link "Picture for category Electronics" [ref=e80] [cursor=pointer]:
              - /url: /electronics
              - img "Picture for category Electronics" [ref=e81]
          - article [ref=e82]:
            - heading "Apparel" [level=2] [ref=e83]:
              - link "Apparel" [ref=e84] [cursor=pointer]:
                - /url: /apparel
            - link "Picture for category Apparel" [ref=e86] [cursor=pointer]:
              - /url: /apparel
              - img "Picture for category Apparel" [ref=e87]
          - article [ref=e88]:
            - heading "Digital downloads" [level=2] [ref=e89]:
              - link "Digital downloads" [ref=e90] [cursor=pointer]:
                - /url: /digital-downloads
            - link "Picture for category Digital downloads" [ref=e92] [cursor=pointer]:
              - /url: /digital-downloads
              - img "Picture for category Digital downloads" [ref=e93]
        - generic [ref=e94]:
          - heading "Featured products" [level=2] [ref=e95]
          - generic [ref=e96]:
            - article [ref=e98]:
              - link "Picture of Build your own computer" [ref=e100] [cursor=pointer]:
                - /url: /build-your-own-computer
                - img "Picture of Build your own computer" [ref=e101]
              - generic [ref=e102]:
                - heading "Build your own computer" [level=2] [ref=e103]:
                  - link "Build your own computer" [ref=e104] [cursor=pointer]:
                    - /url: /build-your-own-computer
                - generic "1 review(s)" [ref=e105]
                - generic [ref=e108]:
                  - generic [ref=e109]: $1,200.00
                  - generic [ref=e110]:
                    - button "Add to cart" [ref=e111] [cursor=pointer]
                    - button "Add to compare list" [ref=e112] [cursor=pointer]
                    - button "Add to wishlist" [ref=e113] [cursor=pointer]
            - article [ref=e115]:
              - link "Picture of Apple MacBook Pro" [ref=e117] [cursor=pointer]:
                - /url: /apple-macbook-pro
                - img "Picture of Apple MacBook Pro" [ref=e118]
              - generic [ref=e119]:
                - heading "Apple MacBook Pro" [level=2] [ref=e120]:
                  - link "Apple MacBook Pro" [ref=e121] [cursor=pointer]:
                    - /url: /apple-macbook-pro
                - generic "1 review(s)" [ref=e122]
                - generic [ref=e125]:
                  - generic [ref=e126]: $1,800.00
                  - generic [ref=e127]:
                    - button "Add to cart" [ref=e128] [cursor=pointer]
                    - button "Add to compare list" [ref=e129] [cursor=pointer]
                    - button "Add to wishlist" [ref=e130] [cursor=pointer]
            - article [ref=e132]:
              - link "Picture of HTC smartphone" [ref=e134] [cursor=pointer]:
                - /url: /htc-smartphone
                - img "Picture of HTC smartphone" [ref=e135]
              - generic [ref=e136]:
                - heading "HTC smartphone" [level=2] [ref=e137]:
                  - link "HTC smartphone" [ref=e138] [cursor=pointer]:
                    - /url: /htc-smartphone
                - generic "1 review(s)" [ref=e139]
                - generic [ref=e142]:
                  - generic [ref=e143]: $245.00
                  - generic [ref=e144]:
                    - button "Add to cart" [ref=e145] [cursor=pointer]
                    - button "Add to compare list" [ref=e146] [cursor=pointer]
                    - button "Add to wishlist" [ref=e147] [cursor=pointer]
            - article [ref=e149]:
              - link "Picture of $25 Virtual Gift Card" [ref=e151] [cursor=pointer]:
                - /url: /25-virtual-gift-card
                - img "Picture of $25 Virtual Gift Card" [ref=e152]
              - generic [ref=e153]:
                - heading "$25 Virtual Gift Card" [level=2] [ref=e154]:
                  - link "$25 Virtual Gift Card" [ref=e155] [cursor=pointer]:
                    - /url: /25-virtual-gift-card
                - generic "1 review(s)" [ref=e156]
                - generic [ref=e159]:
                  - generic [ref=e160]: $25.00
                  - generic [ref=e161]:
                    - button "Add to cart" [ref=e162] [cursor=pointer]
                    - button "Add to compare list" [ref=e163] [cursor=pointer]
                    - button "Add to wishlist" [ref=e164] [cursor=pointer]
        - generic [ref=e165]:
          - heading "News" [level=2] [ref=e166]
          - generic [ref=e167]:
            - article [ref=e168]:
              - generic [ref=e169]:
                - link "About nopCommerce" [ref=e170] [cursor=pointer]:
                  - /url: /about-nopcommerce
                  - heading "About nopCommerce" [level=3] [ref=e171]
                - time [ref=e172]: "-Tuesday, November 4, 2025"
              - generic [ref=e173]: It's stable and highly usable. From downloads to documentation, www.nopCommerce.com offers a comprehensive base of information, resources, and support to the nopCommerce community.
              - link "details" [ref=e175] [cursor=pointer]:
                - /url: /about-nopcommerce
            - article [ref=e176]:
              - generic [ref=e177]:
                - link "nopCommerce new release!" [ref=e178] [cursor=pointer]:
                  - /url: /nopcommerce-new-release
                  - heading "nopCommerce new release!" [level=3] [ref=e179]
                - time [ref=e180]: "-Tuesday, November 4, 2025"
              - generic [ref=e181]: nopCommerce includes everything you need to begin your e-commerce online store. We have thought of everything and it's all included! nopCommerce is a fully customizable shopping cart
              - link "details" [ref=e183] [cursor=pointer]:
                - /url: /nopcommerce-new-release
            - article [ref=e184]:
              - generic [ref=e185]:
                - link "New online store is open!" [ref=e186] [cursor=pointer]:
                  - /url: /new-online-store-is-open
                  - heading "New online store is open!" [level=3] [ref=e187]
                - time [ref=e188]: "-Tuesday, November 4, 2025"
              - generic [ref=e189]: The new nopCommerce store is open now! We are very excited to offer our new range of products. We will be constantly adding to our range so please register on our site.
              - link "details" [ref=e191] [cursor=pointer]:
                - /url: /new-online-store-is-open
          - link "View News Archive" [ref=e193] [cursor=pointer]:
            - /url: /news
        - generic [ref=e194]:
          - heading "Community poll" [level=2] [ref=e195]
          - generic [ref=e196]:
            - strong [ref=e197]: Do you like nopCommerce?
            - list [ref=e198]:
              - listitem [ref=e199]:
                - radio "Excellent" [ref=e200] [cursor=pointer]
                - generic [ref=e201] [cursor=pointer]: Excellent
              - listitem [ref=e202]:
                - radio "Good" [ref=e203] [cursor=pointer]
                - generic [ref=e204] [cursor=pointer]: Good
              - listitem [ref=e205]:
                - radio "Poor" [ref=e206] [cursor=pointer]
                - generic [ref=e207] [cursor=pointer]: Poor
              - listitem [ref=e208]:
                - radio "Very bad" [ref=e209] [cursor=pointer]
                - generic [ref=e210] [cursor=pointer]: Very bad
            - button "Vote" [ref=e212] [cursor=pointer]
    - contentinfo [ref=e213]:
      - generic [ref=e214]:
        - navigation [ref=e215]:
          - heading "Information" [level=2] [ref=e216]
          - menu "Information" [ref=e217]:
            - menuitem "Sitemap" [ref=e218]:
              - link "Sitemap" [ref=e219] [cursor=pointer]:
                - /url: /sitemap
            - menuitem "Shipping & returns" [ref=e220]:
              - link "Shipping & returns" [ref=e221] [cursor=pointer]:
                - /url: /shipping-returns
            - menuitem "Privacy notice" [ref=e222]:
              - link "Privacy notice" [ref=e223] [cursor=pointer]:
                - /url: /privacy-notice
            - menuitem "Conditions of Use" [ref=e224]:
              - link "Conditions of Use" [ref=e225] [cursor=pointer]:
                - /url: /conditions-of-use
            - menuitem "About us" [ref=e226]:
              - link "About us" [ref=e227] [cursor=pointer]:
                - /url: /about-us
            - menuitem "Contact us" [ref=e228]:
              - link "Contact us" [ref=e229] [cursor=pointer]:
                - /url: /contactus
          - heading "Customer service" [level=2] [ref=e230]
          - menu "Customer service" [ref=e231]:
            - menuitem "Search" [ref=e232]:
              - link "Search" [ref=e233] [cursor=pointer]:
                - /url: /search
            - menuitem "News" [ref=e234]:
              - link "News" [ref=e235] [cursor=pointer]:
                - /url: /news
            - menuitem "Blog" [ref=e236]:
              - link "Blog" [ref=e237] [cursor=pointer]:
                - /url: /blog
            - menuitem "Recently viewed products" [ref=e238]:
              - link "Recently viewed products" [ref=e239] [cursor=pointer]:
                - /url: /recentlyviewedproducts
            - menuitem "Compare products list" [ref=e240]:
              - link "Compare products list" [ref=e241] [cursor=pointer]:
                - /url: /compareproducts
            - menuitem "New products" [ref=e242]:
              - link "New products" [ref=e243] [cursor=pointer]:
                - /url: /newproducts
          - heading "My account" [level=2] [ref=e244]
          - menu "My account" [ref=e245]:
            - menuitem "My account" [ref=e246]:
              - link "My account" [ref=e247] [cursor=pointer]:
                - /url: /customer/info
            - menuitem "Orders" [ref=e248]:
              - link "Orders" [ref=e249] [cursor=pointer]:
                - /url: /order/history
            - menuitem "Addresses" [ref=e250]:
              - link "Addresses" [ref=e251] [cursor=pointer]:
                - /url: /customer/addresses
            - menuitem "Shopping cart" [ref=e252]:
              - link "Shopping cart" [ref=e253] [cursor=pointer]:
                - /url: /cart
            - menuitem "Wishlist" [ref=e254]:
              - link "Wishlist" [ref=e255] [cursor=pointer]:
                - /url: /wishlist
            - menuitem "Apply for vendor account" [ref=e256]:
              - link "Apply for vendor account" [ref=e257] [cursor=pointer]:
                - /url: /vendor/apply
        - generic [ref=e258]:
          - generic [ref=e259]:
            - heading "Follow us" [level=2] [ref=e260]
            - list [ref=e261]:
              - listitem [ref=e262]:
                - link "Facebook" [ref=e263] [cursor=pointer]:
                  - /url: https://www.facebook.com/nopCommerce
              - listitem [ref=e264]:
                - link "Twitter" [ref=e265] [cursor=pointer]:
                  - /url: https://twitter.com/nopCommerce
              - listitem [ref=e266]:
                - link "RSS" [ref=e267] [cursor=pointer]:
                  - /url: /news/rss/1
              - listitem [ref=e268]:
                - link "YouTube" [ref=e269] [cursor=pointer]:
                  - /url: https://www.youtube.com/user/nopCommerce
              - listitem [ref=e270]:
                - link "Instagram" [ref=e271] [cursor=pointer]:
                  - /url: https://www.instagram.com/nopcommerce_official
          - form [ref=e272]:
            - heading "Newsletter" [level=2] [ref=e273]
            - generic [ref=e275]:
              - textbox "Sign up for our newsletter" [ref=e276]:
                - /placeholder: Enter your email here...
              - button "Subscribe" [ref=e277] [cursor=pointer]
      - generic [ref=e278]:
        - generic [ref=e279]: Copyright © 2026 nopCommerce demo store. All rights reserved.
        - generic [ref=e280]:
          - text: Powered by
          - link "nopCommerce" [ref=e281] [cursor=pointer]:
            - /url: https://www.nopcommerce.com/
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const HomePage = require('../../pages/HomePage');
  3  | const Footer = require('../../components/Footer');
  4  | const Header = require('../../components/Header');
  5  | 
  6  | test.describe('Navigation Tests', () => {
  7  |   let homePage;
  8  |   let footer;
  9  |   let header;
  10 | 
  11 |   test.beforeEach(async ({ page }) => {
  12 |     homePage = new HomePage(page);
  13 |     footer = new Footer(page);
  14 |     header = new Header(page);
  15 |     await homePage.navigate();
  16 |   });
  17 | 
  18 |   test('@functional Verify footer is visible', async ({ page }) => {
  19 |     const isVisible = await footer.isFooterVisible();
  20 |     expect(isVisible).toBe(true);
  21 |   });
  22 | 
  23 |   test('@functional Verify header is visible', async ({ page }) => {
  24 |     const isVisible = await header.isLogoVisible();
  25 |     expect(isVisible).toBe(true);
  26 |   });
  27 | 
  28 |   test('@functional Navigate to sitemap', async ({ page }) => {
  29 |     await footer.clickSitemap();
  30 |     await expect(page).toHaveURL(/sitemap/);
  31 |   });
  32 | 
  33 |   test('@functional Navigate to shipping & returns', async ({ page }) => {
  34 |     await footer.clickShippingReturns();
  35 |     await expect(page).toHaveURL(/shipping-returns/);
  36 |   });
  37 | 
  38 |   test('@functional Navigate to privacy notice', async ({ page }) => {
  39 |     await footer.clickPrivacyNotice();
  40 |     await expect(page).toHaveURL(/privacy-notice/);
  41 |   });
  42 | 
  43 |   test('@functional Navigate to conditions of use', async ({ page }) => {
  44 |     await footer.clickConditionsOfUse();
  45 |     await expect(page).toHaveURL(/conditions-of-use/);
  46 |   });
  47 | 
  48 |   test('@functional Navigate to about us', async ({ page }) => {
  49 |     await footer.clickAboutUs();
  50 |     await expect(page).toHaveURL(/about-us/);
  51 |   });
  52 | 
  53 |   test('@functional Navigate to contact us', async ({ page }) => {
  54 |     await footer.clickContactUs();
  55 |     await expect(page).toHaveURL(/contactus/);
  56 |   });
  57 | 
  58 |   test('@functional Navigate to news page', async ({ page }) => {
  59 |     await footer.clickNews();
  60 |     await expect(page).toHaveURL(/news/);
  61 |   });
  62 | 
  63 |   test('@functional Verify footer links are displayed', async ({ page }) => {
  64 |     const links = await footer.getAllInformationLinks();
  65 |     expect(links.length).toBeGreaterThan(0);
  66 |   });
  67 | 
  68 |   test('@functional Verify social media links are visible', async ({ page }) => {
  69 |     const isFacebookVisible = await footer.isFacebookLinkVisible();
  70 |     expect(isFacebookVisible).toBe(true);
  71 |   });
  72 | 
  73 |   test('@functional Verify Twitter link is visible', async ({ page }) => {
  74 |     const isTwitterVisible = await footer.isTwitterLinkVisible();
  75 |     expect(isTwitterVisible).toBe(true);
  76 |   });
  77 | 
  78 |   test('@functional Navigate to category via header menu', async ({ page }) => {
> 79 |     await page.hover('.header-menu > ul > li:first-child');
     |                ^ TimeoutError: page.hover: Timeout 15000ms exceeded.
  80 |     await page.click('.header-menu a[href*="/computers"]');
  81 |     await expect(page).toHaveURL(/computers/);
  82 |   });
  83 | 
  84 |   test('@functional Navigate to category via header menu - Electronics', async ({ page }) => {
  85 |     await page.hover('.header-menu > ul > li:nth-child(2)');
  86 |     await page.click('.header-menu a[href*="/electronics"]');
  87 |     await expect(page).toHaveURL(/electronics/);
  88 |   });
  89 | });
```