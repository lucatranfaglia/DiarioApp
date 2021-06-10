'use strict';

const {
    Model,
    Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Recensione extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Recensione.belongsTo(models.Professore, {
                foreignKey: 'professoreId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    Recensione.init({
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
        titolo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descrizione: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        voto: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        indexes: [{
            unique: false,
            fields: ['professoreId']
        }, {
            unique: false,
            fields: ['titolo']
        }, {
            unique: false,
            fields: ['descrizione']
        }, {
            unique: false,
            fields: ['voto']
        }, {
            unique: false,
            fields: ['professoreId', 'titolo']
        }],
        sequelize,
        freezeTableName: true
    });
    return Recensione;
};