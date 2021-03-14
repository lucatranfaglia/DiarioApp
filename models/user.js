'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        id: {
            type: DataTypes.BIGINT(100),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        social: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        socialId: {
            type: DataTypes.BIGINT(100),
            allowNull: false
        },
        locale: {
            type: DataTypes.STRING,
            allowNull: true
        },
        picture: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};