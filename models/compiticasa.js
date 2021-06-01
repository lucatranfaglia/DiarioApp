'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CompitiCasa extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    };
    CompitiCasa.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        materiaUserId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        priorita: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stato: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        testo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        notifica: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'CompitiCasa',
    });
    return CompitiCasa;
};