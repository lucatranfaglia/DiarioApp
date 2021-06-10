'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ricevimento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Ricevimento.belongsTo(models.Professore, {
                foreignKey: 'professoreId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    Ricevimento.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        professoreId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        giorno: {
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
        luogo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        indexes: [{
            unique: false,
            fields: ['professoreId']
        }, {
            unique: false,
            fields: ['giorno']
        }, {
            unique: false,
            fields: ['ora_inizio']
        }, {
            unique: false,
            fields: ['ora_fine']
        }, {
            unique: false,
            fields: ['luogo']
        }, {
            unique: false,
            fields: ['professoreId', 'giorno']
        }, {
            unique: false,
            fields: ['professoreId', 'giorno', 'ora_inizio']
        }, {
            unique: false,
            fields: ['professoreId', 'giorno', 'ora_inizio', 'ora_fine']
        }],
        sequelize,
        freezeTableName: true
    });
    return Ricevimento;
};