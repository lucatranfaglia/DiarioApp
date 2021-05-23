'use strict';
const {
    Model
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
        }
    };
    MateriaUser.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT(100)
        },
        userId: {
            type: Sequelize.BIGINT(100),
            allowNull: false,
        },
        materiaId: {
            type: Sequelize.BIGINT(100),
            allowNull: false,
        },
        professore: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        laboratorio: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        giustificazioni: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        crediti: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
    }, {
        sequelize,
        modelName: 'MateriaUser',
    });
    return MateriaUser;
};