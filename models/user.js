'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    };
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(100)
        },
        userAuthId: {
            type: DataTypes.BIGINT(100),
            allowNull: false
        },
        istitutoId: {
            type: DataTypes.BIGINT(100),
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        anno: {
            type: DataTypes.INTEGER(5),
            allowNull: true
        },
        sezione: {
            type: DataTypes.STRING(5),
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};