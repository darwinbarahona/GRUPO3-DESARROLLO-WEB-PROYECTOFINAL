const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Vehicle = db.define('Vehicle', {
  plates: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  motor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  // Relación con el usuario propietario
});

module.exports = Vehicle;
