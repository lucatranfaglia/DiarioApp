'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Professore extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Professore.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        istitutoId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cognome: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telefono: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
    }, {
        sequelize,
        freezeTableName: true
    });
    return Professore;
};