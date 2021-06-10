'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrarioScolastico extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrarioScolastico.belongsTo(models.MateriaUser, {
                foreignKey: 'materiaUserId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    OrarioScolastico.init({
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
        aula: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        giornoSettimana: {
            type: DataTypes.ENUM('Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'),
            allowNull: false,
        },
        ora_inizio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        ora_fine: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    }, {
        indexes: [{
                unique: false,
                fields: ['materiaUserId']
            }, {
                unique: false,
                fields: ['aula']
            }, {
                unique: false,
                fields: ['giornoSettimana']
            }, {
                unique: false,
                fields: ['ora_inizio']
            },
            {
                unique: false,
                fields: ['ora_fine']
            }, {
                unique: false,
                fields: ['materiaUserId', 'aula']
            },
            {
                unique: false,
                fields: ['materiaUserId', 'giornoSettimana']
            },
            {
                unique: false,
                fields: ['materiaUserId', 'giornoSettimana', 'aula']
            }
        ],
        sequelize,
        freezeTableName: true
    });
    return OrarioScolastico;
};