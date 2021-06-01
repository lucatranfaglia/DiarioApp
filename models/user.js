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
            type: DataTypes.BIGINT
        },
        userAuthId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        istitutoId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('ACTIVE', 'SUSPENDED', 'DELETED'),
            allowNull: false,
            defaultValue: 'ACTIVE'
        },
        nickname: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        anno: {
            type: DataTypes.INTEGER,
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