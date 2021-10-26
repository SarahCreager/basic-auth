'use strict';

require ('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./userModel.js');

let DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

// production database requires extra config
const options = process.env.NODE_ENV === 'production'
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
  : {};

const sequelize = new Sequelize(DATABASE_URL, options);
const User = UserModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  User
}