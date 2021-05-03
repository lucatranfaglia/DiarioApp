'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
    class Materia extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Materia.init({
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
        compiticaCasaId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        orarioId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        pagellaId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        submaterieSetId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        votiSetId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        colore: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataCompito: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dataInterrogazione: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dataPratico: {
            type: DataTypes.DATE,
            allowNull: false
        },
        giustificazioni: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nomeMateria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notificaCompito: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notificaInterrogazione: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notificaPratico: {
            type: DataTypes.STRING,
            allowNull: false
        },
        professore: {
            type: DataTypes.STRING,
            allowNull: false
        },
        votoPagella: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        DataTypes,
        modelName: 'Materia',
    });
    return Materia;
};