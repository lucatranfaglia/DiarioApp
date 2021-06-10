'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MateriaVoti extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MateriaVoti.belongsTo(models.MateriaUser, {
                foreignKey: 'materiaUserId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    MateriaVoti.init({
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
        tipologia: {
            type: DataTypes.ENUM("scritto", "orale", "pratico", "giustificazione"),
            allowNull: false,
        },
        voto: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
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
            fields: ['tipologia']
        }, {
            unique: false,
            fields: ['voto']
        }, {
            unique: false,
            fields: ['data']
        }, {
            unique: false,
            fields: ['materiaUserId', 'tipologia']
        }, {
            unique: false,
            fields: ['materiaUserId', 'voto']
        }, {
            unique: false,
            fields: ['materiaUserId', 'data']
        }, {
            unique: false,
            fields: ['materiaUserId', 'tipologia', 'data']
        }, {
            unique: false,
            fields: ['materiaUserId', 'tipologia', 'voto']
        }, , {
            unique: false,
            fields: ['materiaUserId', 'tipologia', 'voto', 'data']
        }],
        sequelize,
        freezeTableName: true
    });
    return MateriaVoti;
};