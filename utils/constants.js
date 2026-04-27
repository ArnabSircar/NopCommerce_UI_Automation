const BASE_URL = 'https://demo.nopcommerce.com';

const CURRENCY = {
  US_DOLLAR: 'US Dollar',
  EURO: 'Euro'
};

const USER_ROLES = {
  GUEST: 'guest',
  REGISTERED: 'registered',
  ADMIN: 'admin'
};

const NAVIGATION_LINKS = {
  HOME: '/',
  COMPUTERS: '/computers',
  ELECTRONICS: '/electronics',
  APPAREL: '/apparel',
  DIGITAL_DOWNLOADS: '/digital-downloads',
  BOOKS: '/books',
  JEWELRY: '/jewelry',
  GIFT_CARDS: '/gift-cards'
};

const TEST_TIMEOUTS = {
  DEFAULT: 30000,
  LONG: 60000,
  SHORT: 5000
};

const LOCATORS = {
  LOGO: '.header-logo a img',
  SEARCH_INPUT: '#small-searchterms',
  SEARCH_BUTTON: '.search-box-button',
  MENU: '.header-menu',
  FOOTER: '.footer',
  CURRENCY_SELECTOR: '.currency-select',
  LANGUAGE_SELECTOR: '.language-select',
  REGISTER_LINK: '.header-links a[href*="/register"]',
  LOGIN_LINK: '.header-links a[href*="/login"]',
  WISHLIST_LINK: '.header-links a[href*="/wishlist"]',
  CART_LINK: '.header-links a[href*="/cart"]',
  LOGO_IMAGE: '.header-logo a img',
  FEATURED_PRODUCTS: '.product-grid .item-box',
  CATEGORIES_MENU: '.category-grid',
  NEWSLETTER_INPUT: '#newsletter-email',
  NEWSLETTER_BUTTON: '#newsletter-subscribe-button',
  PRODUCT_ADD_TO_CART: '.add-to-cart-button',
  SHOPPING_CART: '#shopping-cart-link',
  CHECKOUT_BUTTON: '#checkout',
  CONTINUE_BUTTON: '.continue-button'
};

module.exports = {
  BASE_URL,
  CURRENCY,
  USER_ROLES,
  NAVIGATION_LINKS,
  TEST_TIMEOUTS,
  LOCATORS
};