'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Istituto extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Istituto.belongsTo(models.Istruzione, {
                foreignKey: 'istruzioneId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    Istituto.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        istruzioneId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        istituto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        citta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        indexes: [{
                unique: false,
                fields: ['istruzioneId']
            }, {
                unique: false,
                fields: ['istituto']
            }, {
                unique: false,
                fields: ['citta']
            }, {
                unique: false,
                fields: ['istituto', 'citta']
            },
            {
                unique: false,
                fields: ['istruzioneId', 'citta']
            },

            {
                unique: false,
                fields: ['istruzioneId', 'istituto']
            },
            {
                unique: false,
                fields: ['istruzioneId', 'istituto', 'citta']
            }
        ],
        sequelize,
        freezeTableName: true
    });
    return Istituto;
};