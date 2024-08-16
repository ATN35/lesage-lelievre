const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const ChambreFuneraire = require('./ChambreFuneraire');

const AvisDeDeces = sequelize.define('AvisDeDeces', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_defunt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_deces: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    lieu_deces: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    chambre_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ChambreFuneraire,
            key: 'id',
        }
    }
});

module.exports = AvisDeDeces;
