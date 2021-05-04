'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Un utente può avere molte autenticazioni (social, email)
            User.hasMany(models.UserAuth);

            // Un utente può avere molti Avvisi
            User.hasMany(models.Avviso);

            // Un utente ha tanti CompitiCasa
            User.hasMany(models.CompitiCasa);
        }
    };
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        assenzeSetId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        avvisiSetId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        compitiCasaSetId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        compitiSetId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        materieSetId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        orarioScolasticoSetId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        orarioSetId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        pagelleSetId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        isSelected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        DataTypes,
        modelName: 'User',
    });
    return User;
};