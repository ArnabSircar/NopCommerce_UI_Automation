const { BASE_URL } = require('../utils/constants');

class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = BASE_URL;
  }

  async navigate(path = '') {
    await this.page.goto(`${this.baseUrl}${path}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async waitForLoadState() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async fill(selector, value) {
    await this.page.fill(selector, value);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  async waitForSelector(selector, options = {}) {
    await this.page.waitForSelector(selector, { state: 'visible', ...options });
  }

  async getAttribute(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async getTitle() {
    return await this.page.title();
  }

  async waitForNavigation(action) {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      action()
    ]);
  }

  async reload() {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }

  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async screenshot(name) {
    await this.page.screenshot({ path: `./screenshots/${name}.png` });
  }

  async isEnabled(selector) {
    const element = this.page.locator(selector);
    return await element.isEnabled();
  }

  async countElements(selector) {
    return await this.page.locator(selector).count();
  }
}

module.exports = BasePage;