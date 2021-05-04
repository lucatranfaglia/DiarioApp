'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
    class MateriaCompito extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    MateriaCompito.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        materiaId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        tipologia: {
            type: DataTypes.ENUM("scritto", "orale", "pratico"),
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        notifica: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        DataTypes,
        modelName: 'MateriaCompito',
    });
    return MateriaCompito;
};