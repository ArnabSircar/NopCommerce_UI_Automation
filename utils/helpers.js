const { test, expect } = require('@playwright/test');

async function waitForElementVisible(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

async function clickElement(page, selector) {
  await page.click(selector);
}

async function fillInput(page, selector, value) {
  await page.fill(selector, value);
}

async function getText(page, selector) {
  return await page.textContent(selector);
}

async function isElementVisible(page, selector) {
  const element = await page.locator(selector);
  return await element.isVisible();
}

async function waitForPageLoad(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
}

function generateRandomEmail() {
  const timestamp = Date.now();
  return `testuser${timestamp}@test.com`;
}

function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function takeScreenshot(page, name) {
  await page.screenshot({ path: `./screenshots/${name}.png`, fullPage: true });
}

async function handleAlert(page, accept = true) {
  page.on('dialog', async dialog => {
    if (accept) {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });
}

async function waitForNavigation(page, action) {
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    action()
  ]);
}

module.exports = {
  waitForElementVisible,
  clickElement,
  fillInput,
  getText,
  isElementVisible,
  waitForPageLoad,
  generateRandomEmail,
  generateRandomString,
  takeScreenshot,
  handleAlert,
  waitForNavigation
};