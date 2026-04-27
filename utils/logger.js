class Logger {
  constructor() {
    this.testName = '';
  }

  setTestName(name) {
    this.testName = name;
  }

  info(message) {
    console.log(`[INFO] ${this.getTimestamp()} - ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${this.getTimestamp()} - ${message}`);
  }

  warn(message) {
    console.warn(`[WARN] ${this.getTimestamp()} - ${message}`);
  }

  debug(message) {
    console.log(`[DEBUG] ${this.getTimestamp()} - ${message}`);
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  logTestStart(testName) {
    console.log(`\n═══════════════════════════════════════════════════`);
    console.log(`  Starting Test: ${testName}`);
    console.log(`═══════════════════════════════════════════════════\n`);
  }

  logTestEnd(testName, status) {
    console.log(`\n═══════════════════════════════════════════════════`);
    console.log(`  Finished Test: ${testName} - ${status}`);
    console.log(`═══════════════════════════════════════════════════\n`);
  }
}

module.exports = new Logger();