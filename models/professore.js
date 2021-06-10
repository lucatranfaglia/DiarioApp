'use strict';
const {
    Model,
    Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Professore extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Professore.belongsTo(models.Istituto, {
                foreignKey: 'istitutoId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    Professore.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        istitutoId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cognome: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telefono: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
    }, {
        indexes: [{
                unique: false,
                fields: ['istitutoId']
            }, {
                unique: false,
                fields: ['nome']
            }, {
                unique: false,
                fields: ['cognome']
            }, {
                unique: false,
                fields: ['email']
            }, {
                unique: false,
                fields: ['istitutoId', 'nome']
            },
            {
                unique: false,
                fields: ['istitutoId', 'cognome']
            }
        ],
        sequelize,
        freezeTableName: true
    });
    return Professore;
};