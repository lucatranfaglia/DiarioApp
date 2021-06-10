'use strict';

const User = require('../models/user');
const MateriaUser = require('../models/materiauser');
const Istituto = require('../models/istituto');
const {
    Model,
    Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProfessoreUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    ProfessoreUser.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        istitutoId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            // references: {
            //     // This is a reference to another model
            //     model: Istituto,

            //     // This is the column name of the referenced model
            //     key: 'id',

            //     // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
            //     deferrable: Deferrable.INITIALLY_IMMEDIATE
            //         // Options:
            //         // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
            //         // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
            //         // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
            // }
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            // references: {
            //     // This is a reference to another model
            //     model: User,

            //     // This is the column name of the referenced model
            //     key: 'id',

            //     // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
            //     deferrable: Deferrable.INITIALLY_IMMEDIATE
            //         // Options:
            //         // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
            //         // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
            //         // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
            // }
        },
        materiaUserId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            // references: {
            //     // This is a reference to another model
            //     model: MateriaUser,

            //     // This is the column name of the referenced model
            //     key: 'id',

            //     // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
            //     deferrable: Deferrable.INITIALLY_IMMEDIATE
            //         // Options:
            //         // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
            //         // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
            //         // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
            // }
        },
        professoreId: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
    }, {
        sequelize,
        freezeTableName: true
    });
    return ProfessoreUser;
};