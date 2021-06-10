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
        static associate(models) {
            CompitiCasa.belongsTo(models.MateriaUser, {
                foreignKey: 'materiaUserId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
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
            type: DataTypes.ENUM("nuovo", "dacompletare", "completato"),
            allowNull: false,
        },
        testo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        notifica: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        indexes: [{
            unique: false,
            fields: ['materiaUserId']
        }, {
            unique: false,
            fields: ['data']
        }, {
            unique: false,
            fields: ['priorita']
        }, {
            unique: false,
            fields: ['stato']
        }, {
            unique: false,
            fields: ['materiaUserId', 'data']
        }, {
            unique: false,
            fields: ['materiaUserId', 'priorita']
        }, {
            unique: false,
            fields: ['materiaUserId', 'data', 'priorita']
        }, ],
        sequelize,
        freezeTableName: true
    });
    return CompitiCasa;
};