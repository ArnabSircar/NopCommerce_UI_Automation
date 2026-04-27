class Header {
  constructor(page) {
    this.page = page;
    this.selectors = {
      logo: '.header-logo a',
      searchInput: '#small-searchterms',
      searchButton: '.search-box-button',
      topMenu: '.header-menu',
      registerLink: '.header-links a[href*="/register"]',
      loginLink: '.header-links a[href*="/login"]',
      logoutLink: '.header-links a[href*="/logout"]',
      wishlistLink: '.header-links a[href*="/wishlist"]',
      cartLink: '.header-links a[href*="/cart"]',
      wishlistCount: '.wishlist-qty',
      cartCount: '.cart-qty',
      currencySelector: '#customerCurrency',
      languageSelector: '.language-select'
    };
  }

  async isLogoVisible() {
    return await this.page.locator(this.selectors.logo).isVisible();
  }

  async isSearchVisible() {
    return await this.page.locator(this.selectors.searchInput).isVisible();
  }

  async search(term) {
    await this.page.fill(this.selectors.searchInput, term);
    await this.page.click(this.selectors.searchButton);
  }

  async clickLogo() {
    await this.page.click(this.selectors.logo);
  }

  async clickRegister() {
    await this.page.click(this.selectors.registerLink);
  }

  async clickLogin() {
    await this.page.click(this.selectors.loginLink);
  }

  async clickLogout() {
    await this.page.click(this.selectors.logoutLink);
  }

  async clickWishlist() {
    await this.page.click(this.selectors.wishlistLink);
  }

  async clickCart() {
    await this.page.click(this.selectors.cartLink);
  }

  async isLoggedIn() {
    return await this.page.locator(this.selectors.logoutLink).isVisible();
  }

  async getWishlistCount() {
    const count = await this.page.locator(this.selectors.wishlistCount).textContent();
    return count.replace(/[()]/g, '');
  }

  async getCartCount() {
    const count = await this.page.locator(this.selectors.cartCount).textContent();
    return count.replace(/[()]/g, '');
  }

  async changeCurrency(currency) {
    await this.page.selectOption(this.selectors.currencySelector, currency);
  }
}

module.exports = Header;