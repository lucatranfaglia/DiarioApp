'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Recensione extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Recensione.init({
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
        titolo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descrizione: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        voto: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Recensione',
    });
    return Recensione;
};