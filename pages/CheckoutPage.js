const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      billingAddressSection: '.billing-address',
      billingFirstName: '#BillingNewAddress_FirstName',
      billingLastName: '#BillingNewAddress_LastName',
      billingEmail: '#BillingNewAddress_Email',
      billingCompany: '#BillingNewAddress_Company',
      billingCountry: '#BillingNewAddress_CountryId',
      billingState: '#BillingNewAddress_StateProvinceId',
      billingCity: '#BillingNewAddress_City',
      billingAddress1: '#BillingNewAddress_Address1',
      billingAddress2: '#BillingNewAddress_Address2',
      billingZipCode: '#BillingNewAddress_ZipPostalCode',
      billingPhone: '#BillingNewAddress_PhoneNumber',
      billingContinueButton: '#billing-buttons-container .button-1',
      shippingMethodSection: '.shipping-method',
      shippingMethodRadio: 'input[name="shippingoption"]',
      shippingContinueButton: '#shipping-method-buttons-container .button-1',
      paymentMethodSection: '.payment-method',
      paymentMethodRadio: 'input[name="paymentmethod"]',
      paymentContinueButton: '#payment-method-buttons-container .button-1',
      paymentInfoSection: '.payment-info',
      paymentInfoContinueButton: '#payment-info-buttons-container .button-1',
      confirmOrderSection: '.confirm-order',
      confirmOrderButton: '#confirm-order-buttons-container .button-1',
      orderSuccessPage: '.order-completed',
      orderNumber: '.order-number',
      orderDetailsLink: 'a[href*="/orderdetails"]',
      continueButton: '.continue-button',
      guestCheckoutButton: '.button-1.checkout-as-guest-button',
      errorMessage: '.error',
      validationMessage: '.validation-summary-errors',
      checkoutSteps: '.checkout-steps',
      subtotal: '.sub-total',
      shippingCost: '.shipping-cost',
      tax: '.tax-value',
      total: '.order-total',
      termsOfServiceCheckbox: '#termsofservice',
      creditCardForm: '#paymentmethod_0',
      creditCardNumber: '#CardNumber',
      cardholderName: '#CardholderName',
      expirationMonth: '#ExpireMonth',
      expirationYear: '#ExpireYear',
      cardCode: '#CardCode',
      newAddressButton: '.new-address-next-step-button'
    };
  }

  async navigate() {
    await super.navigate('/checkout');
  }

  async fillBillingAddress(addressData) {
    await this.fill(this.selectors.billingFirstName, addressData.firstName);
    await this.fill(this.selectors.billingLastName, addressData.lastName);
    await this.fill(this.selectors.billingEmail, addressData.email);
    await this.fill(this.selectors.billingCompany, addressData.company || '');
    await this.select(this.selectors.billingCountry, addressData.country);
    if (addressData.state) {
      await this.select(this.selectors.billingState, addressData.state);
    }
    await this.fill(this.selectors.billingCity, addressData.city);
    await this.fill(this.selectors.billingAddress1, addressData.address1);
    await this.fill(this.selectors.billingAddress2, addressData.address2 || '');
    await this.fill(this.selectors.billingZipCode, addressData.zipCode);
    await this.fill(this.selectors.billingPhone, addressData.phoneNumber);
  }

  async clickBillingContinue() {
    await this.click(this.selectors.billingContinueButton);
    await this.page.waitForTimeout(3000);
  }

  async selectShippingMethod(method) {
    const methodRadio = this.page.locator(this.selectors.shippingMethodRadio).filter({ hasText: method });
    await methodRadio.check();
  }

  async clickShippingContinue() {
    await this.click(this.selectors.shippingContinueButton);
    await this.page.waitForTimeout(3000);
  }

  async selectPaymentMethod(method) {
    const methodRadio = this.page.locator(this.selectors.paymentMethodRadio).filter({ hasText: method });
    await methodRadio.check();
  }

  async clickPaymentContinue() {
    await this.click(this.selectors.paymentContinueButton);
    await this.page.waitForTimeout(3000);
  }

  async fillPaymentInfo(cardData) {
    await this.fill(this.selectors.creditCardNumber, cardData.number);
    await this.fill(this.selectors.cardholderName, cardData.name);
    await this.select(this.selectors.expirationMonth, cardData.month);
    await this.select(this.selectors.expirationYear, cardData.year);
    await this.fill(this.selectors.cardCode, cardData.cvv);
  }

  async clickPaymentInfoContinue() {
    await this.click(this.selectors.paymentInfoContinueButton);
    await this.page.waitForTimeout(3000);
  }

  async acceptTermsAndConfirm() {
    await this.click(this.selectors.termsOfServiceCheckbox);
    await this.click(this.selectors.confirmOrderButton);
    await this.page.waitForTimeout(5000);
  }

  async isOrderCompleted() {
    await this.waitForSelector(this.selectors.orderSuccessPage, { timeout: 15000 });
    return await this.isVisible(this.selectors.orderSuccessPage);
  }

  async getOrderNumber() {
    return await this.getText(this.selectors.orderNumber);
  }

  async clickGuestCheckout() {
    try {
      await this.page.locator('text=Checkout as Guest').click();
    } catch (e) {
      await this.click(this.selectors.guestCheckoutButton);
    }
    await this.page.waitForTimeout(2000);
  }

  async getErrorMessage() {
    return await this.getText(this.selectors.errorMessage);
  }

  async getValidationMessage() {
    return await this.getText(this.selectors.validationMessage);
  }

  async getSubtotal() {
    return await this.getText(this.selectors.subtotal);
  }

  async getShippingCost() {
    return await this.getText(this.selectors.shippingCost);
  }

  async getTax() {
    return await this.getText(this.selectors.tax);
  }

  async getTotal() {
    return await this.getText(this.selectors.total);
  }

  async isShippingMethodVisible() {
    return await this.isVisible(this.selectors.shippingMethodSection);
  }

  async isPaymentMethodVisible() {
    return await this.isVisible(this.selectors.paymentMethodSection);
  }
}

module.exports = CheckoutPage;