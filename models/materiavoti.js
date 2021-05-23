'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
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
            type: DataTypes.BIGINT(100),
            allowNull: false,
        },
        tipologia: {
            type: DataTypes.ENUM("scritto", "orale", "pratico"),
            allowNull: false,
        },
        giustificazione: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        voto: {
            type: DataTypes.FLOAT,
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
        modelName: 'MateriaVoti',
    });
    return MateriaVoti;
};