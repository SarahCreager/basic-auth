'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstringfortesting';
// Create a Sequelize model
const Users = (sequelize, DataTypes) => {
  
  const userTable = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get () {
        let payload = {
          username: this.username,
        }
        return jwt.sign(payload, SECRET);
      }
    }
  });

  // runs before we create any user
  userTable.beforeCreate(async (user) => {
    let encryptedPassword = await bcrypt.hash(user.password, 10);
    // set user.password to an encrypted one, so whenever we create a user we encrpyt the password at runtime
    user.password = encryptedPassword;
  });

  return userTable;
}

module.exports = Users;
