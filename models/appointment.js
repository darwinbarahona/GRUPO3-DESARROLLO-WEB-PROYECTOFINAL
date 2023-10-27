const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Service = require('./Service');
const Vehicle = require('./Vehicle');

const Appointment = db.define('appointments', {
    appointment_date: {
    type: DataTypes.DATE,
    allowNull: false
    },
    status: {
    type: DataTypes.ENUM('pending', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Appointment.belongsTo(Service, { foreignKey: 'service_id' });
Appointment.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

module.exports = Appointment;