const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const AvisGoogle = require('./AvisGoogle');

const Commentaire = sequelize.define('Commentaire', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    utilisateur_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    avis_id: {
        type: DataTypes.INTEGER,
        references: {
            model: AvisGoogle,
            key: 'id',
        }
    }
});

module.exports = Commentaire;
