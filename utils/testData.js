const testUsers = {
  validUser: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@test.com',
    password: 'Test@123456',
    confirmPassword: 'Test@123456'
  },
  newUser: {
    firstName: 'Test',
    lastName: 'User',
    email: `testuser${Date.now()}@test.com`,
    password: 'Test@123456',
    confirmPassword: 'Test@123456'
  },
  invalidEmail: {
    firstName: 'Test',
    lastName: 'User',
    email: 'invalidemail',
    password: 'Test@123456',
    confirmPassword: 'Test@123456'
  },
  shortPassword: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: '123',
    confirmPassword: '123'
  },
  mismatchedPassword: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: 'Test@123456',
    confirmPassword: 'Different@123'
  }
};

const products = {
  buildYourOwnComputer: {
    name: 'Build your own computer',
    price: '$1,200.00',
    url: '/build-your-own-computer'
  },
  appleMacBookPro: {
    name: 'Apple MacBook Pro',
    price: '$1,800.00',
    url: '/apple-macbook-pro'
  },
  htcSmartphone: {
    name: 'HTC smartphone',
    price: '$245.00',
    url: '/htc-smartphone'
  },
  giftCard25: {
    name: '$25 Virtual Gift Card',
    price: '$25.00',
    url: '/25-virtual-gift-card'
  }
};

const searchTerms = {
  valid: 'laptop',
  partial: 'phone',
  noResults: 'xyz123nonexistent',
  specialChar: '<script>alert(1)</script>'
};

const checkoutData = {
  billingAddress: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    company: 'Test Company',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    address1: '123 Test Street',
    address2: 'Apt 4B',
    zipCode: '10001',
    phoneNumber: '555-1234'
  },
  shippingMethod: {
    ground: 'Ground',
    nextDayAir: 'Next Day Air',
    secondDayAir: '2nd Day Air'
  },
  paymentMethod: {
    creditCard: 'Credit Card',
    paypal: 'PayPal',
    purchaseOrder: 'Purchase Order'
  }
};

const categoryUrls = {
  computers: '/computers',
  desktops: '/desktops',
  notebooks: '/notebooks',
  software: '/software',
  electronics: '/electronics',
  cameraPhoto: '/camera-photo',
  cellPhones: '/cell-phones',
  apparel: '/apparel',
  shoes: '/shoes',
  clothing: '/clothing',
  accessories: '/accessories',
  digitalDownloads: '/digital-downloads',
  books: '/books',
  jewelry: '/jewelry',
  giftCards: '/gift-cards'
};

module.exports = {
  testUsers,
  products,
  searchTerms,
  checkoutData,
  categoryUrls
};