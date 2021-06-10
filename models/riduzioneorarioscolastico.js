'use strict';
const {
    Model,
    Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RiduzioneOrarioScolastico extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            RiduzioneOrarioScolastico.belongsTo(models.User, {
                foreignKey: 'userId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    RiduzioneOrarioScolastico.init({
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
        tipologia: {
            type: DataTypes.ENUM("ritardo", "entrata", "uscita"),
            allowNull: false,
        },
        ora: {
            type: DataTypes.FLOAT,
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
            fields: ['tipologia']
        }, {
            unique: false,
            fields: ['userId', 'data']
        }, {
            unique: false,
            fields: ['userId', 'data', 'tipologia']
        }, {
            unique: false,
            fields: ['userId', 'tipologia']
        }],
        sequelize,
        freezeTableName: true
    });
    return RiduzioneOrarioScolastico;
};