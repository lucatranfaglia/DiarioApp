'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Submateria extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Submateria.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        materiaUserIdParent: {
            type: DataTypes.BIGINT(100),
            allowNull: false,
        },
        materiaUserIdChild: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        sequelize,
        modelName: 'Submateria',
    });
    return Submateria;
};