const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('user', 'company'),
    allowNull: false
  }  
});

module.exports = User;
