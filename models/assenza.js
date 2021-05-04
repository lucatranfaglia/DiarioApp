'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assenza extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Assenza.init({
    userId: DataTypes.BIGINT,
    data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Assenza',
  });
  return Assenza;
};