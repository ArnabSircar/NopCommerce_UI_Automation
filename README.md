# NopCommerce UI Automation Testing

![Playwright](https://img.shields.io/badge/Playwright-2.9+-45ba4b?style=flat&logo=playwright)
![Allure](https://img.shields.io/badge/Allure-Report-2.29+-yellow?style=flat)
![CI/CD](https://img.shields.io/badge/GitHub-Actions-2088FF?style=flat&logo=github)

## Overview

This project provides comprehensive UI automation testing for the NopCommerce Demo Store (https://demo.nopcommerce.com/) using Playwright with JavaScript. It follows industry-standard testing practices with a robust Page Object Model (POM) architecture.

## Project Highlights

- **Test Framework**: Playwright with JavaScript
- **Architecture**: Page Object Model (POM)
- **Reporting**: HTML & Allure Reports
- **CI/CD**: GitHub Actions with automated testing

## Test Coverage

| Test Category | Test Count | Description |
|---------------|-------------|-------------|
| Smoke Tests | 9 | Critical path validation |
| Functional Tests | 50+ | Core feature testing |
| Security Tests | 6 | Security validation |
| Performance Tests | 6 | Performance benchmarking |
| Regression Tests | 4 | End-to-end flows |
| **Total** | **75+** | **Comprehensive coverage** |

## Test Categories

### 1. Smoke Tests (`tests/smoke/`)
Critical path tests that verify basic functionality:
- Homepage loads correctly
- Search functionality works
- Product, Cart, Login, Register pages accessible
- Category navigation works
- Footer links accessible

### 2. Functional Tests (`tests/functional/`)
- Homepage: Logo, search, featured products, categories
- Navigation: Header/footer links, menu navigation
- Search: Product search, results display
- Product Browsing: Product details, prices, add to cart/wishlist
- Shopping Cart: Add/remove products, quantity update
- Checkout: Guest checkout, billing/shipping/payment
- User Authentication: Registration, login, logout
- Wishlist: Add/remove products

### 3. Security Tests (`tests/security/`)
- HTTPS verification on all pages
- Password masking in forms
- CSRF token validation

### 4. Performance Tests (`tests/performance/`)
- Page load times measurement
- Time to First Byte (TTFB)
- Resource size measurement
- Console error checking

### 5. Regression Tests (`tests/regression/`)
- Complete purchase flows
- User registration to checkout
- Category browsing

## Project Structure

```
NopCommerce_UI_Automation/
├── .github/workflows/       # CI/CD pipeline
├── pages/                   # Page Object Models
│   ├── BasePage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── SearchResultsPage.js
├── components/             # Reusable components
│   ├── Header.js
│   └── Footer.js
├── utils/                   # Utilities
│   ├── pageObjects.js       # Page object initialization
│   ├── constants.js
│   ├── testData.js
│   ├── helpers.js
│   └── logger.js
├── config/                  # Configuration
│   └── env.config.js
├── tests/                   # Test files
│   ├── smoke/
│   ├── functional/
│   ├── security/
│   ├── performance/
│   └── regression/
├── playwright.config.js
├── package.json
└── README.md
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Category
```bash
npm run test:smoke       # Smoke tests only
npm run test:functional  # Functional tests
npm run test:regression  # Regression tests
npm run test:security    # Security tests
npm run test:performance # Performance tests
```

### Run with Headed Mode
```bash
npm run test:headed
```

### Run with UI Mode
```bash
npm run test:ui
```

## Generating Reports

### HTML Report
```bash
npx playwright show-report
```

### Allure Report
```bash
npm run allure:generate
npm run allure:open
```

## CI/CD Pipeline

The project includes GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. **Triggers**: On push to `main`/`master` and pull requests
2. **Setup**: Node.js LTS, dependencies, Playwright browsers
3. **Test Execution**: Runs all tests with Allure reporting
4. **Report Generation**: Creates Allure reports
5. **Artifact Upload**: Stores test results, screenshots, and reports

### GitHub Actions Status
![CI/CD](https://github.com/ArnabSircar/NopCommerce_UI_Automation/actions/workflows/playwright.yml/badge.svg)

## Test Results

### Latest Run Summary
- **Smoke Tests**: 9/9 passed ✅
- **Functional Tests**: 50+ tests
- **Security Tests**: 6/6 passed ✅
- **Performance Tests**: 6/6 passed ✅

### Performance Metrics
| Metric | Value |
|--------|-------|
| Homepage Load Time | ~925ms |
| Product Page Load Time | ~855ms |
| Login Page Load Time | ~585ms |
| Time to First Byte | ~1315ms |
| Total Resource Size | ~227 KB |

## Technologies Used

- **Playwright**: Modern end-to-end testing framework
- **Allure**: Test reporting and analysis
- **GitHub Actions**: CI/CD automation
- **JavaScript**: Programming language

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ArnabSircar/NopCommerce_UI_Automation.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **View reports**:
   ```bash
   npx playwright show-report
   ```

## Configuration

Environment variables can be configured in `.env` file:
```
BASE_URL=https://demo.nopcommerce.com
BROWSER=chromium
TIMEOUT=30000
HEADLESS=false
```

## Best Practices Implemented

1. **Page Object Model**: Separation of page logic from test code
2. **Reusable Components**: Header, Footer components
3. **Centralized Test Data**: utils/testData.js
4. **Environment Configuration**: Multiple environment support
5. **Automatic Reporting**: HTML and Allure reports
6. **CI/CD Integration**: Automated testing on GitHub Actions
7. **Screenshots/Videos**: Automatic capture on failure
8. **Parallel Execution**: Faster test runs

## Contributing

Feel free to contribute by:
1. Reporting issues
2. Suggesting improvements
3. Adding new test cases
4. Improving documentation

## License

ISC License

## Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This project tests the NopCommerce demo store available at https://demo.nopcommerce.com/