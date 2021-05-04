'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
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
        materiaId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        compitiId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        votiId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        orarioId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        nomeSubmateria: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        DataTypes,
        modelName: 'Submateria',
    });
    return Submateria;
};