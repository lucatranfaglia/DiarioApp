'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProfessoreUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    ProfessoreUser.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        istitutoId: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        materiaId: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        professoreId: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
    }, {
        sequelize,
        freezeTableName: true
    });
    return ProfessoreUser;
};