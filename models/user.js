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
        static associate(models) {}
    };
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(100)
        },
        userAuthId: {
            type: DataTypes.BIGINT(100),
            allowNull: true
        },
        nickname: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    }, {
        DataTypes,
        modelName: 'User',
    });
    return User;
};