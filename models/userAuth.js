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
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                len: [2, 20]
            }
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                len: [2, 10]
            }
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        psw: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        fiscal_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(2),
            allowNull: true
        },
        social: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        social_id: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        flag_marketing: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        flag_personal_data: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        flag_privacy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        device_info: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {}
        },
        user_profile: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'USER'
        },
        status: {
            type: DataTypes.ENUM('CREATED', 'ACTIVE', 'SUSPENDED', 'DELETED'),
            allowNull: false,
            defaultValue: 'CREATED'
        },
        additional_info: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {}
        },
        locale: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        picture: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        update_info: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {}
        },
    }, {
        sequelize,
        modelName: 'UserAuth',
    });
    return UserAuth;
};