'use strict';
const User = require('../models/user');
const {
    Model,
    Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Avviso extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Un avviso appartiene ad un User        
            Avviso.belongsTo(models.User, {
                foreignKey: 'userId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    Avviso.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        indiceColore: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notifica: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        testo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        titolo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        indexes: [{
            unique: false,
            fields: ['userId']
        }, {
            unique: false,
            fields: ['data']
        }, {
            unique: false,
            fields: ['indiceColore']
        }, {
            unique: false,
            fields: ['notifica']
        }, {
            unique: false,
            fields: ['testo']
        }, {
            unique: false,
            fields: ['titolo']
        }, {
            unique: false,
            fields: ['userId', 'data']
        }, {
            unique: false,
            fields: ['userId', 'notifica']
        }, {
            unique: false,
            fields: ['userId', 'data', 'notifica']
        }],
        sequelize,
        freezeTableName: true
    });
    return Avviso;
};