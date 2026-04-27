const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      emailInput: '#Email',
      passwordInput: '#Password',
      loginButton: '.login-button',
      registerLink: 'a[href*="/register"]',
      forgotPasswordLink: 'a[href*="/passwordrecovery"]',
      rememberMeCheckbox: '#RememberMe',
      validationError: '.validation-summary-errors',
      loginError: '.message-error',
      logoutButton: '.logout-button',
      myAccountLink: 'a[href*="/customer/info"]',
      changePasswordLink: 'a[href*="/customer/changepassword"]',
      addressLink: 'a[href*="/customer/addresses"]'
    };
  }

  async navigate() {
    await super.navigate('/login');
  }

  async login(email, password) {
    await this.fill(this.selectors.emailInput, email);
    await this.fill(this.selectors.passwordInput, password);
    await this.click(this.selectors.loginButton);
  }

  async loginWithRememberMe(email, password) {
    await this.fill(this.selectors.emailInput, email);
    await this.fill(this.selectors.passwordInput, password);
    await this.click(this.selectors.rememberMeCheckbox);
    await this.click(this.selectors.loginButton);
  }

  async clickForgotPassword() {
    await this.click(this.selectors.forgotPasswordLink);
  }

  async clickRegister() {
    await this.click(this.selectors.registerLink);
  }

  async isLoggedIn() {
    return await this.isVisible(this.selectors.logoutButton);
  }

  async getLoginError() {
    return await this.getText(this.selectors.loginError);
  }

  async isValidationErrorVisible() {
    return await this.isVisible(this.selectors.validationError);
  }

  async logout() {
    if (await this.isVisible(this.selectors.logoutButton)) {
      await this.click(this.selectors.logoutButton);
    }
  }

  async isMyAccountVisible() {
    return await this.isVisible(this.selectors.myAccountLink);
  }

  async clickMyAccount() {
    await this.click(this.selectors.myAccountLink);
  }

  async getEmailError() {
    const emailField = this.page.locator(this.selectors.emailInput);
    const validationMessage = await emailField.evaluate(el => el.validationMessage);
    return validationMessage;
  }
}

module.exports = LoginPage;