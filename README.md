# NopCommerce UI Automation Testing

![Playwright](https://img.shields.io/badge/Playwright-2.9+-45ba4b?style=flat&logo=playwright)
![Allure](https://img.shields.io/badge/Allure-Report-2.29+-yellow?style=flat)
![CI/CD](https://img.shields.io/badge/GitHub-Actions-2088FF?style=flat&logo=github)
![Tests](https://img.shields.io/badge/Tests-80%20Passed-green?style=flat)

## Overview

This project provides comprehensive UI automation testing for the NopCommerce Demo Store (https://demo.nopcommerce.com/) using Playwright with JavaScript. It follows industry-standard testing practices with a robust Page Object Model (POM) architecture.

## Test Results - Latest Run

| Status | Count |
|--------|-------|
| ✅ Passed | 80 |
| ❌ Failed | 0 |
| **Total** | **80** |

## Test Coverage

| Test Category | Test Count | Description |
|---------------|-------------|-------------|
| Smoke Tests | 9 | Critical path validation |
| Functional Tests | 53 | Core feature testing |
| Security Tests | 6 | Security validation |
| Performance Tests | 6 | Performance benchmarking |
| Regression Tests | 6 | End-to-end flows |
| **Total** | **80** | **100% Pass Rate** |

## Allure Report

View the live Allure test report:

### 🔗 **https://arnabsircar.github.io/NopCommerce_UI_Automation/**

The Allure report includes:
- Test execution summary with pass/fail percentages
- Detailed breakdown by test categories
- Duration metrics for each test
- Visual charts and graphs
- Failed test details (if any)

## Running Tests Locally

### Run All Tests
```bash
npm test
```

### Run Specific Categories
```bash
npm run test:smoke       # 9 tests
npm run test:functional  # 53 tests
npm run test:security    # 6 tests
npm run test:performance # 6 tests
npm run test:regression  # 6 tests
```

### View Reports
```bash
# HTML Report
npx playwright show-report

# Allure Report
npm run allure:generate
npm run allure:open
```

## CI/CD Pipeline

The project uses GitHub Actions to run tests and generate Allure reports automatically on every push.

### Workflow Steps:
1. **Trigger**: Runs on push to main branch
2. **Setup**: Node.js LTS, installs dependencies
3. **Test Execution**: Runs all 80 tests with Allure
4. **Report Generation**: Creates Allure HTML report
5. **Publish**: Deploys report to GitHub Pages

### GitHub Actions Status
[![Playwright Tests](https://github.com/ArnabSircar/NopCommerce_UI_Automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/ArnabSircar/NopCommerce_UI_Automation/actions/workflows/playwright.yml)

## Test Categories

### 1. Smoke Tests (9 tests)
- Homepage loads correctly
- Search functionality works
- Product, Cart, Login, Register pages accessible
- Category navigation works
- Wishlist page accessible
- Footer links accessible

### 2. Functional Tests (53 tests)
- Homepage: Logo, search, featured products, categories
- Navigation: Header/footer links, menu navigation
- Search: Product search, results display
- Product Browsing: Product details, prices, add to cart/wishlist
- Shopping Cart: Add/remove products, cart operations
- Checkout: Checkout page functionality
- User Authentication: Registration, login, logout
- Wishlist: Add/remove products

### 3. Security Tests (6 tests)
- HTTPS verification on all pages
- Password masking in forms
- CSRF token validation

### 4. Performance Tests (6 tests)
- Page load times measurement
- Time to First Byte (TTFB)
- Resource size measurement
- Console error checking

### 5. Regression Tests (6 tests)
- Browse products by category
- User registration
- Product page navigation
- Search functionality

## Project Structure

```
NopCommerce_UI_Automation/
├── .github/workflows/       # CI/CD pipeline
├── pages/                   # Page Object Models
│   ├── BasePage.js
│   ├── HomePage.js, LoginPage.js, RegisterPage.js
│   ├── ProductPage.js, CartPage.js, CheckoutPage.js
│   └── SearchResultsPage.js
├── components/              # Header.js, Footer.js
├── utils/                  # Utilities
│   ├── pageObjects.js       # Initialize all page objects
│   ├── constants.js, testData.js, helpers.js, logger.js
├── tests/                  # Test files by category
│   ├── smoke/, functional/, security/
│   ├── performance/, regression/
├── playwright.config.js
└── README.md
```

## Performance Metrics

| Metric | Value |
|--------|-------|
| Homepage Load Time | ~922ms |
| Product Page Load Time | ~845ms |
| Login Page Load Time | ~521ms |
| Time to First Byte | ~687ms |
| Product Listing Load | ~720ms |

## Getting Started

```bash
# Clone
git clone https://github.com/ArnabSircar/NopCommerce_UI_Automation.git

# Install
npm install

# Test
npm test
```

## Technologies Used
- **Playwright** - End-to-end testing
- **Allure** - Test reporting
- **GitHub Actions** - CI/CD
- **JavaScript** - Language

## License
ISC License

---
**Testing**: https://demo.nopcommerce.com/ | **Report**: [https://arnabsircar.github.io/NopCommerce_UI_Automation/](https://arnabsircar.github.io/NopCommerce_UI_Automation/)
