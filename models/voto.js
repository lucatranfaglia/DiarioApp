'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
    class Voto extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Voto.init({

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
        submateriaId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isOrale: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        voto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        DataTypes,
        modelName: 'Voto',
    });
    return Voto;
};