const env = require('./env.js');
const {Sequelize} = require('sequelize');
const initModels = require('../models/init-models.js');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const models = initModels(sequelize);
module.exports = {sequelize,models};
