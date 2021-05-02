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
        }
    };
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        isSelected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        DataTypes,
        modelName: 'User',
    });
    return User;
};