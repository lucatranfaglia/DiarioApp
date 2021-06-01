'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Istituto extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Istituto.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(100)
        },
        istituto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        localita: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Istituto',
    });
    return Istituto;
};