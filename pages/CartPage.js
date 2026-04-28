const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      cartItems: '.cart-items',
      cartItemRow: '.cart-item-row',
      productName: '.product-name',
      unitPrice: '.unit-price',
      quantityInput: '.qty-input',
      subtotal: '.subtotal',
      removeButton: '.remove-btn',
      updateCartButton: '.update-cart-button',
      continueShoppingButton: 'a[href*="/"]',
      checkoutButton: '#checkout',
      emptyCartMessage: '.no-data',
      cartSummary: '.cart-summary',
      discountCodeInput: '#discountcouponcode',
      applyDiscountButton: '.apply-discount-coupon-button',
      giftCardInput: '#giftcardcouponcode',
      applyGiftCardButton: '.apply-gift-card-coupon-button',
      discountSuccessMessage: '.discount-success-message',
      discountErrorMessage: '.discount-error-message',
      orderSummary: '.order-summary',
      total: '.cart-total',
      estimatedShipping: '.shipping-cost',
      termsOfServiceCheckbox: '#termsofservice',
      checkoutButtonTop: '#checkout',
      itemCount: '.cart-qty',
      wishlistLink: 'a[href*="/wishlist"]'
    };
  }

  async navigate() {
    await super.navigate('/cart');
  }

  async getCartItemCount() {
    const items = await this.page.locator(this.selectors.cartItemRow).count();
    return items;
  }

  async isCartEmpty() {
    return await this.isVisible(this.selectors.emptyCartMessage);
  }

  async getProductName(index = 0) {
    const productNames = await this.page.locator(this.selectors.productName).allTextContents();
    return productNames[index];
  }

  async getProductPrice(index = 0) {
    const prices = await this.page.locator(this.selectors.unitPrice).allTextContents();
    return prices[index];
  }

  async updateQuantity(productName, quantity) {
    const row = this.page.locator(`.cart-item-row:has-text("${productName}")`);
    const qtyInput = row.locator(this.selectors.quantityInput);
    await qtyInput.fill(quantity.toString());
    await this.click(this.selectors.updateCartButton);
    await this.page.waitForTimeout(2000);
  }

  async removeProduct(productName) {
    const removeBtn = this.page.locator(`.cart-item-row:has-text("${productName}") ${this.selectors.removeButton}`);
    await removeBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async clearCart() {
    try {
      const items = await this.page.locator(this.selectors.cartItemRow).count();
      if (items > 0) {
        for (let i = 0; i < items; i++) {
          await this.page.locator(this.selectors.removeButton).first().click();
          await this.page.waitForTimeout(1500);
        }
      }
    } catch (e) {
      console.log('Cart already empty or error clearing cart');
    }
  }

  async applyDiscountCode(code) {
    await this.fill(this.selectors.discountCodeInput, code);
    await this.click(this.selectors.applyDiscountButton);
    await this.page.waitForTimeout(2000);
  }

  async applyGiftCard(code) {
    await this.fill(this.selectors.giftCardInput, code);
    await this.click(this.selectors.applyGiftCardButton);
    await this.page.waitForTimeout(2000);
  }

  async getDiscountMessage() {
    return await this.getText(this.selectors.discountSuccessMessage);
  }

  async getDiscountError() {
    return await this.getText(this.selectors.discountErrorMessage);
  }

  async getTotal() {
    return await this.getText(this.selectors.total);
  }

  async proceedToCheckout() {
    try {
      await this.page.locator('a[href*="/checkout"]').first().click({ timeout: 5000 });
    } catch (e) {
      await this.page.locator('#checkout').click({ timeout: 5000 });
    }
    await this.page.waitForTimeout(3000);
  }

  async acceptTermsOfService() {
    const checkbox = this.page.locator(this.selectors.termsOfServiceCheckbox);
    if (await checkbox.isVisible()) {
      await checkbox.check();
    }
  }

  async isTermsOfServiceVisible() {
    return await this.isVisible(this.selectors.termsOfServiceCheckbox);
  }

  async clickContinueShopping() {
    await this.click(this.selectors.continueShoppingButton);
  }

  async addToWishlistFromCart(productName) {
    const wishlistLink = this.page.locator(`.cart-item-row:has-text("${productName}") ${this.selectors.wishlistLink}`);
    await wishlistLink.click();
  }

  async isProductInCart(productName) {
    const productRow = this.page.locator(`.cart-item-row:has-text("${productName}")`);
    return await productRow.isVisible();
  }
}

module.exports = CartPage;