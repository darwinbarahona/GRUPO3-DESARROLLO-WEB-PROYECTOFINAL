const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Service = db.define('Service', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
 
});

module.exports = Service;
