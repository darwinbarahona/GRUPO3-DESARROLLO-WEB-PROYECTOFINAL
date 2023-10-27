const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Profile = db.define('profiles', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    cui: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    nit: DataTypes.STRING,
    department: DataTypes.STRING,
    municipality: DataTypes.STRING
  });
  
  module.exports = Profile;