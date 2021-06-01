'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MateriaVoti extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    MateriaVoti.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        materiaIdUser: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        tipologia: {
            type: DataTypes.ENUM("scritto", "orale", "pratico", "giustificazione"),
            allowNull: false,
        },
        voto: {
            type: DataTypes.FLOAT,
            allowNull: true,
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
        sequelize,
        modelName: 'MateriaVoti',
    });
    return MateriaVoti;
};