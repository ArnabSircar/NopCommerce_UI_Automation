const BasePage = require('./BasePage');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      firstNameInput: '#FirstName',
      lastNameInput: '#LastName',
      emailInput: '#Email',
      passwordInput: '#Password',
      confirmPasswordInput: '#ConfirmPassword',
      registerButton: '#register-button',
      loginLink: 'a[href*="/login"]',
      maleGender: '#gender-male',
      femaleGender: '#gender-female',
      firstNameError: '#FirstName-error',
      lastNameError: '#LastName-error',
      emailError: '#Email-error',
      passwordError: '#Password-error',
      confirmPasswordError: '#ConfirmPassword-error',
      registrationSuccess: '.result',
      validationSummary: '.validation-summary-errors',
      continueButton: '.button-1.continue-button',
      logoutLink: 'a[href*="/logout"]',
      registrationConfirmedMessage: '.registration-result'
    };
  }

  async navigate() {
    await super.navigate('/register');
  }

  async register(userData) {
    await this.fill(this.selectors.firstNameInput, userData.firstName);
    await this.fill(this.selectors.lastNameInput, userData.lastName);
    await this.fill(this.selectors.emailInput, userData.email);
    await this.fill(this.selectors.passwordInput, userData.password);
    await this.fill(this.selectors.confirmPasswordInput, userData.confirmPassword);
    await this.click(this.selectors.registerButton);
    await this.page.waitForTimeout(3000);
  }

  async selectGender(gender) {
    if (gender === 'male') {
      await this.click(this.selectors.maleGender);
    } else if (gender === 'female') {
      await this.click(this.selectors.femaleGender);
    }
  }

  async clickLogin() {
    await this.click(this.selectors.loginLink);
  }

  async isRegistrationSuccess() {
    try {
      await this.waitForSelector(this.selectors.registrationSuccess, { timeout: 10000 });
      const successMessage = await this.getText(this.selectors.registrationSuccess);
      return successMessage.toLowerCase().includes('success');
    } catch (e) {
      const confirmed = await this.isVisible(this.selectors.registrationConfirmedMessage);
      return confirmed;
    }
  }

  async getFirstNameError() {
    return await this.getText(this.selectors.firstNameError);
  }

  async getLastNameError() {
    return await this.getText(this.selectors.lastNameError);
  }

  async getEmailError() {
    return await this.getText(this.selectors.emailError);
  }

  async getPasswordError() {
    return await this.getText(this.selectors.passwordError);
  }

  async getConfirmPasswordError() {
    return await this.getText(this.selectors.confirmPasswordError);
  }

  async isValidationSummaryVisible() {
    return await this.isVisible(this.selectors.validationSummary);
  }

  async getValidationSummary() {
    return await this.getText(this.selectors.validationSummary);
  }

  async clickContinue() {
    try {
      await this.waitForSelector(this.selectors.continueButton, { timeout: 5000 });
      await this.click(this.selectors.continueButton);
      await this.page.waitForTimeout(2000);
    } catch (e) {
      await this.page.locator('text=Continue').first().click();
    }
  }

  async logout() {
    await this.click(this.selectors.logoutLink);
  }

  async isLoggedIn() {
    return await this.isVisible(this.selectors.logoutLink);
  }
}

module.exports = RegisterPage;