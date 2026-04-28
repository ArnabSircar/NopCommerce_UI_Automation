const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      productTitle: 'h1',
      productPrice: '.price',
      productDescription: '.short-description',
      fullDescription: '.full-description',
      addToCartButton: '.product-grid .add-to-cart-button, .add-to-cart-button',
      addToWishlistButton: 'button:has-text("Add to wishlist")',
      addToCompareButton: 'button:has-text("Add to compare")',
      quantityInput: '#addtocart_0_EnteredQuantity',
      successMessage: '.success',
      errorMessage: '.error',
      categoryBreadcrumb: '.breadcrumb a',
      productImages: '.gallery .picture',
      mainImage: '.picture img',
      relatedProducts: '.related-products-grid',
      tags: '.product-tags',
      reviewLink: 'a[href*="/productreviews"]',
      writeReviewLink: 'a[href*="/productreviews/new"]',
      addToCartNotification: '.bar-notification',
      emailAFriendLink: 'a[href*="/productemail"]'
    };
  }

  async navigate(path) {
    await super.navigate(path);
  }

  async getProductTitle() {
    await this.waitForSelector(this.selectors.productTitle, { timeout: 10000 });
    return await this.getText(this.selectors.productTitle);
  }

  async getProductPrice() {
    await this.waitForSelector(this.selectors.productPrice, { timeout: 10000 });
    return await this.getText(this.selectors.productPrice);
  }

  async getProductDescription() {
    return await this.getText(this.selectors.productDescription);
  }

  async addToCart(quantity = 1) {
    if (quantity > 1) {
      await this.fill(this.selectors.quantityInput, quantity.toString());
    }
    await this.click(this.selectors.addToCartButton);
    await this.page.waitForTimeout(2000);
  }

  async addToWishlist() {
    await this.click(this.selectors.addToWishlistButton);
    await this.page.waitForTimeout(2000);
  }

  async addToCompare() {
    await this.click(this.selectors.addToCompareButton);
  }

  async isAddToCartVisible() {
    return await this.isVisible(this.selectors.addToCartButton);
  }

  async isAddToWishlistVisible() {
    return await this.isVisible(this.selectors.addToWishlistButton);
  }

  async isAddToCompareVisible() {
    return await this.isVisible(this.selectors.addToCompareButton);
  }

  async getSuccessMessage() {
    await this.waitForSelector(this.selectors.successMessage);
    return await this.getText(this.selectors.successMessage);
  }

  async getBreadcrumb() {
    const breadcrumbs = await this.page.locator(this.selectors.categoryBreadcrumb).allTextContents();
    return breadcrumbs;
  }

  async clickCategoryInBreadcrumb(categoryName) {
    const breadcrumb = this.page.locator(`${this.selectors.categoryBreadcrumb}:has-text("${categoryName}")`);
    await breadcrumb.click();
  }

  async clickWriteReview() {
    await this.click(this.selectors.writeReviewLink);
  }

  async clickEmailAFriend() {
    await this.click(this.selectors.emailAFriendLink);
  }

  async changeProductImage(imageIndex) {
    const images = this.page.locator(this.selectors.productImages);
    await images.nth(imageIndex).click();
    await this.waitForLoadState();
  }

  async getMainImageSrc() {
    return await this.getAttribute(this.selectors.mainImage, 'src');
  }

  async isReviewLinkVisible() {
    return await this.isVisible(this.selectors.reviewLink);
  }

  async getProductTags() {
    return await this.getText(this.selectors.tags);
  }
}

module.exports = ProductPage;