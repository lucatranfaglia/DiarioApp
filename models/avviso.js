'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
    class Avviso extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Un avviso appartiene ad un User
            Avviso.belongsTo(models.User);
        }
    };
    Avviso.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        creationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        indiceColore: {
            type: DataTypes.STRING,
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
        titolo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        DataTypes,
        modelName: 'Avviso',
    });
    return Avviso;
};