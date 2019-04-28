// Establish logging with log4js
//
// LOG_LEVEL can be set with env variable or
// in .env file (and read using helper/config)

// Usage in other js files:
// var logger = require('/path/to/logger.js').logger;

import log4js from 'log4js';

// Use singleton pattren in the absence of a more
// sophisticated approach employed by, e.g. winston
const obj = {};
if (!obj.logger) {
  // Define logger and logging level
  obj.logger = log4js.getLogger();
  obj.logger.level = process.env.LOG_LEVEL || 'warn';
}

module.exports = obj;
