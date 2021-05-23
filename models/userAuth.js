'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserAuth extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    };
    UserAuth.init({
        id: {
            type: DataTypes.BIGINT(100),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        social: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        socialId: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        locale: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        picture: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'UserAuth',
    });
    return UserAuth;
};