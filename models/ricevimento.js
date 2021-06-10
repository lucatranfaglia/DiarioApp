'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ricevimento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Ricevimento.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        professoreId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        giorno: {
            type: DataTypes.ENUM('Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'),
            allowNull: false,
        },
        ora_inizio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        ora_fine: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        luogo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        freezeTableName: true
    });
    return Ricevimento;
};