'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pagella extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Pagella.belongsTo(models.User, {
                foreignKey: 'userId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    Pagella.init({
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
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        infoVoti: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['userId']
            }, {
                unique: false,
                fields: ['nome']
            }, {
                unique: false,
                fields: ['infoVoti']
            }, {
                unique: false,
                fields: ['userId', 'infoVoti']
            },
            {
                unique: true,
                fields: ['userId', 'nome', 'infoVoti']
            }
        ],
        sequelize,
        freezeTableName: true
    });
    return Pagella;
};