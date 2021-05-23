'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
    class OrarioScolasticos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    OrarioScolasticos.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        materiaUserId: {
            type: DataTypes.BIGINT(100),
            allowNull: false,
        },
        aula: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        giornoSettimana: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ora: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    }, {
        DataTypes,
        modelName: 'OrarioScolasticos',
    });
    return OrarioScolasticos;
};