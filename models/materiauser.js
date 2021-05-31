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
            type: DataTypes.BIGINT(100)
        },
        userId: {
            type: DataTypes.BIGINT(100),
            allowNull: false,
        },
        materiaId: {
            type: DataTypes.BIGINT(100),
            allowNull: false,
        },
        professoreId: {
            type: DataTypes.BIGINT(100),
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
        sequelize,
        modelName: 'MateriaUser'
    });
    return MateriaUser;
};