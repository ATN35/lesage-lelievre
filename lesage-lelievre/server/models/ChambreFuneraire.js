const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ChambreFuneraire = sequelize.define('ChambreFuneraire', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false,
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = ChambreFuneraire;
