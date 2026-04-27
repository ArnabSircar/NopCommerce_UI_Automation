require('dotenv').config();

const environment = process.env.NODE_ENV || 'staging';

const envConfig = {
  staging: {
    baseUrl: 'https://demo.nopcommerce.com',
    headless: false,
    slowMo: 0,
    timeout: 30000
  },
  production: {
    baseUrl: 'https://www.nopcommerce.com',
    headless: true,
    slowMo: 0,
    timeout: 30000
  },
  development: {
    baseUrl: 'https://demo.nopcommerce.com',
    headless: false,
    slowMo: 50,
    timeout: 60000
  },
  ci: {
    baseUrl: 'https://demo.nopcommerce.com',
    headless: true,
    slowMo: 0,
    timeout: 60000
  }
};

const currentConfig = envConfig[environment] || envConfig.staging;

module.exports = {
  environment,
  ...currentConfig
};