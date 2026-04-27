const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      logo: '.header-logo a',
      searchInput: '#small-searchterms',
      searchButton: '.search-box-button',
      featuredProducts: '.product-grid .item-box',
      featuredProductsContainer: '.featured-products-grid',
      categoryGrid: '.category-grid',
      currencySelector: '#customerCurrency',
      registerLink: 'a[href*="/register"]',
      loginLink: 'a[href*="/login"]',
      wishlistLink: 'a[href*="/wishlist"]',
      cartLink: 'a[href*="/cart"]',
      wishlistCount: '.wishlist-qty',
      cartCount: '.cart-qty',
      newsletterInput: '#newsletter-email',
      newsletterButton: '#newsletter-subscribe-button',
      newsletterSuccessMessage: '.newsletter-success',
      footerSection: '.footer',
      newsSection: '.news-list-homepage',
      pollSection: '.poll',
      computersCategory: '.category-grid a[href*="/computers"]',
      electronicsCategory: '.category-grid a[href*="/electronics"]',
      welcomeMessage: 'h2:has-text("Welcome to our store")',
      productAddToCart: '.add-to-cart-button',
      compareProductsLink: 'a[href*="/compareproducts"]',
      sitemapLink: 'a[href*="/sitemap"]',
      contactUsLink: 'a[href*="/contactus"]'
    };
  }

  async navigate() {
    await super.navigate('/');
  }

  async isLogoVisible() {
    return await this.isVisible(this.selectors.logo);
  }

  async isSearchBoxVisible() {
    return await this.isVisible(this.selectors.searchInput);
  }

  async searchFor(term) {
    await this.fill(this.selectors.searchInput, term);
    await this.click(this.selectors.searchButton);
  }

  async getFeaturedProductsCount() {
    return await this.countElements(this.selectors.featuredProducts);
  }

  async getCategoryCount() {
    return await this.countElements(this.selectors.categoryGrid);
  }

  async clickOnCategory(categoryName) {
    const categoryLink = this.page.locator(`.category-grid a:has-text("${categoryName}")`);
    await categoryLink.click();
  }

  async clickRegister() {
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async clickLogin() {
    await this.page.getByRole('link', { name: 'Log in' }).click();
  }

  async clickWishlist() {
    await this.page.locator('a[href*="/wishlist"]').first().click();
  }

  async clickCart() {
    await this.page.locator('a[href*="/cart"]').first().click();
  }

  async subscribeNewsletter(email) {
    await this.fill(this.selectors.newsletterInput, email);
    await this.click(this.selectors.newsletterButton);
  }

  async isNewsletterSubscribed() {
    await this.waitForSelector(this.selectors.newsletterSuccessMessage, { timeout: 5000 }).catch(() => {});
    return await this.isVisible(this.selectors.newsletterSuccessMessage);
  }

  async changeCurrency(currency) {
    await this.select(this.selectors.currencySelector, currency);
  }

  async getWelcomeMessage() {
    return await this.getText(this.selectors.welcomeMessage);
  }

  async isComputersCategoryVisible() {
    return await this.isVisible(this.selectors.computersCategory);
  }

  async isElectronicsCategoryVisible() {
    return await this.isVisible(this.selectors.electronicsCategory);
  }

  async clickProductByName(productName) {
    const productLink = this.page.locator(`.product-grid a:has-text("${productName}")`).first();
    await productLink.click();
  }

  async addProductToCart(productName) {
    const productBox = this.page.locator(`.product-grid:has-text("${productName}") .add-to-cart-button`).first();
    await productBox.click();
  }

  async getWishlistCount() {
    const wishlistText = await this.getText(this.selectors.wishlistCount);
    return wishlistText.replace(/[()]/g, '');
  }

  async getCartCount() {
    const cartText = await this.getText(this.selectors.cartCount);
    return cartText.replace(/[()]/g, '');
  }
}

module.exports = HomePage;