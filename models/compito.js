'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
    class Compito extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Un compito appartiene ad uno User
            Compito.hasOne(models.User);
        }
    };
    Compito.init({
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
        notifica: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        testo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        DataTypes,
        modelName: 'Compito',
    });
    return Compito;
};