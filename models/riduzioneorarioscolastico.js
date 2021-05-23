'use strict';
const {
    Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
    class RiduzioneOrarioScolastico extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    RiduzioneOrarioScolastico.init({
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
        tipologia: {
            type: DataTypes.ENUM("ritardo", "entrata", "uscita"),
            allowNull: false,
        },
        ora: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    }, {
        DataTypes,
        modelName: 'RiduzioneOrarioScolastico',
    });
    return RiduzioneOrarioScolastico;
};