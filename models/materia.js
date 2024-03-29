'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Materia extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Materia.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        indexes: [{
            unique: false,
            fields: ['nome']
        }],
        sequelize,
        freezeTableName: true
    });
    return Materia;
};