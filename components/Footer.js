class Footer {
  constructor(page) {
    this.page = page;
    this.selectors = {
      footer: '.footer',
      informationLinks: '.footer-upper a',
      sitemapLink: 'a[href*="/sitemap"]',
      shippingLink: 'a[href*="/shipping-returns"]',
      privacyLink: 'a[href*="/privacy-notice"]',
      conditionsLink: 'a[href*="/conditions-of-use"]',
      aboutUsLink: 'a[href*="/about-us"]',
      contactUsLink: 'a[href*="/contactus"]',
      newsLink: 'a[href*="/news"]',
      blogLink: 'a[href*="/blog"]',
      sitemapLink2: 'a[href*="/sitemap"]',
      customerServiceLinks: '.footer-middle a',
      searchLink: 'a[href*="/search"]',
      recentlyViewedLink: 'a[href*="/recentlyviewedproducts"]',
      compareProductsLink: 'a[href*="/compareproducts"]',
      newProductsLink: 'a[href*="/newproducts"]',
      myAccountLinks: '.footer-lower a',
      ordersLink: 'a[href*="/order/history"]',
      addressesLink: 'a[href*="/customer/addresses"]',
      downloadLink: 'a[href*="/download"]',
      supportLink: 'a[href*="/boards"]',
      faqLink: 'a[href*="/boards"]',
      followUsSection: '.social',
      facebookLink: 'a[href*="facebook"]',
      twitterLink: 'a[href*="twitter"]',
      rssLink: 'a[href*="rss"]',
      youtubeLink: 'a[href*="youtube"]',
      instagramLink: 'a[href*="instagram"]',
      copyright: '.footer-copyright',
      poweredBy: '.footer-poweredby'
    };
  }

  async isFooterVisible() {
    return await this.page.locator(this.selectors.footer).isVisible();
  }

  async clickSitemap() {
    await this.page.click(this.selectors.sitemapLink);
  }

  async clickShippingReturns() {
    await this.page.click(this.selectors.shippingLink);
  }

  async clickPrivacyNotice() {
    await this.page.click(this.selectors.privacyLink);
  }

  async clickConditionsOfUse() {
    await this.page.click(this.selectors.conditionsLink);
  }

  async clickAboutUs() {
    await this.page.click(this.selectors.aboutUsLink);
  }

  async clickContactUs() {
    await this.page.click(this.selectors.contactUsLink);
  }

  async clickNews() {
    await this.page.click(this.selectors.newsLink);
  }

  async clickBlog() {
    await this.page.click(this.selectors.blogLink);
  }

  async clickOrders() {
    await this.page.click(this.selectors.ordersLink);
  }

  async clickAddresses() {
    await this.page.click(this.selectors.addressesLink);
  }

  async isFacebookLinkVisible() {
    return await this.page.locator(this.selectors.facebookLink).isVisible();
  }

  async isTwitterLinkVisible() {
    return await this.page.locator(this.selectors.twitterLink).isVisible();
  }

  async isYoutubeLinkVisible() {
    return await this.page.locator(this.selectors.youtubeLink).isVisible();
  }

  async getCopyrightText() {
    return await this.page.locator(this.selectors.copyright).textContent();
  }

  async getAllInformationLinks() {
    const links = await this.page.locator(this.selectors.informationLinks).allTextContents();
    return links;
  }
}

module.exports = Footer;