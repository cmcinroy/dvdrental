// config.js
const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT, 10) || 4000,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT, 10) || 5432,
    name: process.env.DEV_DB_NAME || 'rise',
    user: process.env.DEV_DB_USERNAME_LOCAL,
    pass: process.env.DEV_DB_PASSWORD_LOCAL,
    ssl: process.env.DEV_SSL || false,
  },
};
const test = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT, 10) || 4000,
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT, 10) || 5432,
    name: process.env.TEST_DB_NAME || 'rise',
    user: process.env.TEST_DB_USERNAME_LOCAL,
    pass: process.env.TEST_DB_PASSWORD_LOCAL,
    ssl: process.env.DEV_SSL || false,
  },
};

const config = {
  dev,
  test,
};

module.exports = config[env];
