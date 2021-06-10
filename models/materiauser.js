'use strict';
const User = require('../models/user');
const Istituto = require('../models/istituto');
const Materia = require('../models/materia');
const ProfessoreUser = require('../models/professoreuser');
const {
    Model,
    Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MateriaUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MateriaUser.belongsTo(models.User, {
                foreignKey: 'userId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            MateriaUser.belongsTo(models.Istituto, {
                foreignKey: 'istitutoId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            MateriaUser.belongsTo(models.Materia, {
                foreignKey: 'materiaId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            MateriaUser.belongsTo(models.Professore, {
                foreignKey: 'professoreId',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    MateriaUser.init({
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
        istitutoId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        materiaId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        professoreId: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM("aula", "laboratorio"),
            allowNull: false,
            defaultValue: "aula"
        },
        giustificazioni: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        crediti: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {

        indexes: [{
            unique: false,
            fields: ['userId']
        }, {
            unique: false,
            fields: ['istitutoId']
        }, {
            unique: false,
            fields: ['materiaId']
        }, {
            unique: false,
            fields: ['professoreId']
        }, {
            unique: false,
            fields: ['type']
        }, {
            unique: false,
            fields: ['userId', 'materiaId']
        }, {
            unique: false,
            fields: ['userId', 'professoreId']
        }, {
            unique: false,
            fields: ['userId', 'materiaId', 'professoreId']
        }],
        sequelize,
        freezeTableName: true
    });
    return MateriaUser;
};