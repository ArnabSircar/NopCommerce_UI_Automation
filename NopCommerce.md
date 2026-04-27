# NopCommerce UI Automation Testing Project

## Overview

This project provides comprehensive UI automation testing for the NopCommerce Demo Store (https://demo.nopcommerce.com/) using Playwright with JavaScript. It follows industry-standard testing practices with a robust Page Object Model (POM) architecture.

---

## Project Structure

```
NopCommerce_UI_Automation/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD Pipeline with Allure
├── .env                            # Environment configuration
├── allure.config.js                # Allure reporting configuration
├── playwright.config.js            # Playwright configuration
├── package.json                    # Dependencies and scripts
├── utils/
│   ├── constants.js               # Application constants
│   ├── helpers.js                 # Utility functions
│   ├── logger.js                  # Logging utilities
│   └── testData.js                # Test data fixtures
├── config/
│   └── env.config.js              # Environment-specific config
├── pages/                         # Page Object Models
│   ├── BasePage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── SearchResultsPage.js
├── components/                    # Reusable components
│   ├── Header.js
│   └── Footer.js
└── tests/
    ├── functional/                # Functional test cases
    │   ├── homepage.spec.js
    │   ├── navigation.spec.js
    │   ├── search.spec.js
    │   ├── productBrowsing.spec.js
    │   ├── shoppingCart.spec.js
    │   ├── checkout.spec.js
    │   ├── userAuth.spec.js
    │   └── wishlist.spec.js
    ├── regression/               # E2E regression tests
    │   └── e2e.spec.js
    ├── security/                 # Security tests
    │   └── security.spec.js
    ├── performance/              # Performance tests
    │   └── performance.spec.js
    └── smoke/                    # Smoke tests
        └── smoke.spec.js
```

---

## Test Categories

### 1. Functional Tests (`tests/functional/`)
- **Homepage Tests**: Verify homepage elements, search, navigation, featured products
- **Navigation Tests**: Test header/footer links, menu navigation, breadcrumbs
- **Search Tests**: Valid search, no results, search filtering, pagination
- **Product Browsing Tests**: Product details, images, prices, add to cart/wishlist
- **Shopping Cart Tests**: Add/remove products, quantity update, discount codes
- **Checkout Process Tests**: Guest checkout, billing/shipping/payment flow
- **User Authentication Tests**: Registration, login, logout, password recovery
- **Wishlist Tests**: Add/remove products, share wishlist, persistence

### 2. Regression Tests (`tests/regression/`)
- End-to-end purchase flows
- User registration and profile management
- Multi-step workflows

### 3. Security Tests (`tests/security/`)
- HTTPS verification
- XSS prevention
- SQL injection prevention
- Password masking
- CSRF token validation

### 4. Performance Tests (`tests/performance/`)
- Page load times
- Navigation performance
- Resource size measurement
- Console error checking

### 5. Smoke Tests (`tests/smoke/`)
- Critical path validation
- Homepage functionality
- Core navigation
- Basic user flows

---

## Test Tags

Tests are organized using Playwright tags for selective execution:

| Tag | Description |
|-----|-------------|
| `@smoke` | Critical smoke tests for quick validation |
| `@functional` | Core functional test cases |
| `@regression` | Full regression/E2E tests |
| `@security` | Security vulnerability tests |
| `@performance` | Performance benchmarking tests |

---

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Tag
```bash
npm run test:smoke       # Run smoke tests only
npm run test:functional  # Run functional tests
npm run test:regression  # Run regression tests
npm run test:security    # Run security tests
npm run test:performance # Run performance tests
```

### Run with Headed Mode (Visual)
```bash
npm run test:headed
```

### Run in Debug Mode
```bash
npm run test:debug
```

### Run with UI Mode
```bash
npm run test:ui
```

---

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

---

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. **Trigger**: On push to `main`/`master` and pull requests
2. **Setup**: Node.js LTS, dependencies, Playwright browsers
3. **Test Execution**: Runs all tests with Allure reporting
4. **Report Generation**: Creates Allure reports
5. **Artifact Upload**: Stores test results, screenshots, and Allure reports

### Workflow Features:
- Runs on Ubuntu latest
- Parallel test execution
- Automatic retry on CI (2 retries)
- Captures screenshots on failure
- Records videos on failure
- Stores reports for 30 days

---

## Page Object Models

### BasePage
Common methods for all pages:
- `navigate(path)` - Navigate to a specific path
- `click(selector)` - Click an element
- `fill(selector, value)` - Fill input field
- `getText(selector)` - Get element text
- `isVisible(selector)` - Check element visibility
- `waitForSelector(selector)` - Wait for element

### Specialized Pages
- **HomePage**: Search, navigation, categories, newsletter
- **LoginPage**: User login, remember me, forgot password
- **RegisterPage**: User registration, validation
- **ProductPage**: Product details, add to cart, wishlist
- **CartPage**: Cart management, discount codes, checkout
- **CheckoutPage**: Multi-step checkout flow
- **SearchResultsPage**: Search results, filtering, sorting

---

## Test Data

Test data is managed in `utils/testData.js`:
- User credentials (valid/invalid)
- Product information
- Checkout data
- Search terms
- Category URLs

---

## Configuration

### Environment Variables (.env)
```
NODE_ENV=staging
BASE_URL=https://demo.nopcommerce.com
BROWSER=chromium
TIMEOUT=30000
HEADLESS=false
```

### Playwright Config
- Base URL: https://demo.nopcommerce.com
- Test directory: ./tests
- Parallel execution enabled
- Retry on CI: 2 retries
- Reporters: HTML, JSON, Allure

---

## Test Results

### Current Status (Smoke Tests)
- **Passed**: 14/20 (70%)
- **Failed**: 6/20 (30%)

### Passing Tests
- Homepage loads correctly
- Search functionality works
- Product page accessible
- Cart page accessible
- Login page accessible
- Register page accessible
- Category navigation works
- Wishlist page accessible
- Footer links accessible

### Known Issues (To Fix)
- Add to cart button selector mismatch
- Checkout button selector needs updating
- Registration validation flow
- Some product price selectors

---

## Dependencies

```json
{
  "@playwright/test": "^1.59.1",
  "@types/node": "^25.6.0",
  "allure-playwright": "^3.2.0",
  "allure-commandline": "^2.29.0",
  "dotenv": "^16.4.5"
}
```

---

## Best Practices Implemented

1. **Page Object Model**: Separation of page logic from test code
2. **Test Data Management**: Centralized test data in utils
3. **Configuration Management**: Environment-based configuration
4. **Reporting**: HTML and Allure reports for visualization
5. **CI/CD Integration**: Automated testing on GitHub Actions
6. **Reusable Components**: Header, Footer components
7. **Tag-based Execution**: Selective test execution
8. **Screenshots/Videos**: Automatic capture on failure
9. **Parallel Execution**: Faster test runs

---

## Future Enhancements

1. Fix remaining failing test selectors
2. Add more comprehensive E2E scenarios
3. Implement visual regression testing
4. Add API testing layer
5. Database validation tests
6. Email notification integration
7. Enhanced reporting with dashboards

---

## Contact

For questions or contributions, please refer to the project repository.