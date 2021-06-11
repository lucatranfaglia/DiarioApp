'use strict';

const {
    Model,
    Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Assenza extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here            
            Assenza.belongsTo(models.User, {
                foreignKey: 'userId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    Assenza.init({
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
            type: DataTypes.DATEONLY,
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
            fields: ['userId', 'data']
        }],
        sequelize,
        freezeTableName: true
    });
    return Assenza;
};