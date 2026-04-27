const BasePage = require('./BasePage');

class SearchResultsPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      searchResults: '.search-results',
      productItems: '.product-grid .item-box',
      noResultsMessage: '.no-results',
      searchTerm: '#q',
      searchButton: '.search-button',
      resultCount: '.result-count',
      productName: '.product-title',
      productPrice: '.price',
      categoryFilter: '.filter-group',
      priceRangeFilter: '.price-range-filter',
      sortOptions: '#products-orderby',
      displayOptions: '#products-viewmode',
      pageSizeOptions: '#products-pagesize',
      paging: '.pager',
      nextPageLink: '.next-page',
      previousPageLink: '.previous-page',
      productGrid: '.product-grid',
      productList: '.product-list'
    };
  }

  async navigate(searchTerm) {
    await super.navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  }

  async getResultCount() {
    const countText = await this.getText(this.selectors.resultCount);
    const match = countText.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  async hasResults() {
    const hasResults = await this.isVisible(this.selectors.productItems);
    const noResults = await this.isVisible(this.selectors.noResultsMessage);
    return hasResults && !noResults;
  }

  async isNoResultsVisible() {
    return await this.isVisible(this.selectors.noResultsMessage);
  }

  async getProductNames() {
    const names = await this.page.locator(this.selectors.productName).allTextContents();
    return names;
  }

  async getProductPrices() {
    const prices = await this.page.locator(this.selectors.productPrice).allTextContents();
    return prices;
  }

  async clickProduct(productName) {
    const productLink = this.page.locator(`${this.selectors.productName} a:has-text("${productName}")`);
    await productLink.click();
  }

  async sortResults(sortBy) {
    await this.select(this.selectors.sortOptions, sortBy);
    await this.waitForLoadState();
  }

  async changeViewMode(mode) {
    await this.select(this.selectors.displayOptions, mode);
    await this.waitForLoadState();
  }

  async changePageSize(size) {
    await this.select(this.selectors.pageSizeOptions, size);
    await this.waitForLoadState();
  }

  async goToNextPage() {
    await this.click(this.selectors.nextPageLink);
    await this.waitForLoadState();
  }

  async goToPreviousPage() {
    await this.click(this.selectors.previousPageLink);
    await this.waitForLoadState();
  }

  async isPagingVisible() {
    return await this.isVisible(this.selectors.paging);
  }

  async addFirstProductToCart() {
    const firstAddToCartButton = this.page.locator(`${this.selectors.productItems} .add-to-cart-button`).first();
    await firstAddToCartButton.click();
  }

  async addProductToWishlist(productName) {
    const wishlistButton = this.page.locator(`.product-grid:has-text("${productName}") .add-to-wishlist-button`).first();
    await wishlistButton.click();
  }
}

module.exports = SearchResultsPage;