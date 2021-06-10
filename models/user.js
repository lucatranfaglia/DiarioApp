'use strict';

const {
    Model,
    Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // Uno User ha tante assenze
            User.belongsTo(models.UserAuth, {
                foreignKey: 'userAuthId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            User.belongsTo(models.Istituto, {
                foreignKey: 'istitutoId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
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
            allowNull: false,
        },
        istitutoId: {
            type: DataTypes.BIGINT,
            allowNull: true,
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
        indexes: [{
                unique: false,
                fields: ['userAuthId']
            }, {
                unique: false,
                fields: ['istitutoId']
            },
            {
                unique: false,
                fields: ['status']
            },
            {
                unique: false,
                fields: ['nickname']
            }, {
                unique: false,
                fields: ['userAuthId', 'istitutoId', 'status']
            }
        ],
        sequelize,
        freezeTableName: true
    });
    return User;
};