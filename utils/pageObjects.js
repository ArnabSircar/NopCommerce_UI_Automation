const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const RegisterPage = require('../pages/RegisterPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const SearchResultsPage = require('../pages/SearchResultsPage');
const Header = require('../components/Header');
const Footer = require('../components/Footer');

function initPageObjects(page) {
  return {
    homePage: new HomePage(page),
    loginPage: new LoginPage(page),
    registerPage: new RegisterPage(page),
    productPage: new ProductPage(page),
    cartPage: new CartPage(page),
    checkoutPage: new CheckoutPage(page),
    searchResultsPage: new SearchResultsPage(page),
    header: new Header(page),
    footer: new Footer(page)
  };
}

module.exports = { initPageObjects };