'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
    class CompitiCasa extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Un compito per casa appartiene ad uno User
            CompitiCasa.hasOne(models.User);
        }
    };
    CompitiCasa.init({

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
        priorità: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stato: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        testo: {
            type: DataTypes.STRING
        },
    }, {
        DataTypes,
        modelName: 'CompitiCasa',
    });
    return CompitiCasa;
};