// Helper for database access
//
import Sequelize from 'sequelize';

const config = require('./config');
const { logger } = require('./logger');

logger.info('Connecting to database: ' +  config.db.name +' at ', config.db.host + ' on port: ' + config.db.port);

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000,
  },
  dialectOptions: {
    ssl: config.db.ssl,
  },
});

sequelize
  .authenticate()
  .then(() => {
    logger.info(`Connection to DVDRental practice DB has been established successfully in: ${process.env.NODE_ENV}`);
  })
  .catch((err) => {
    logger.info('Unable to connect to the database:', err);
  });

module.exports = sequelize;
