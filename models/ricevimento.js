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
            type: DataTypes.BIGINT(100)
        },
        professoreId: {
            type: DataTypes.BIGINT(100),
            allowNull: false,
        },
        giorno: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ora: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        luogo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Ricevimento',
    });
    return Ricevimento;
};