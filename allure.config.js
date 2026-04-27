module.exports = {
  reporter: [
    'line',
    ['allure-playwright', {
      outputDir: './allure-results',
      quiet: false,
      debug: false
    }]
  ]
};