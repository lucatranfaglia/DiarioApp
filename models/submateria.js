'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Submateria extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Submateria.belongsTo(models.MateriaUser, {
                foreignKey: 'materiaUserIdParent',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            Submateria.belongsTo(models.MateriaUser, {
                foreignKey: 'materiaUserIdChild',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    };
    Submateria.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        materiaUserIdParent: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        materiaUserIdChild: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        indexes: [{
            unique: false,
            fields: ['materiaUserIdParent']
        }, {
            unique: false,
            fields: ['materiaUserIdChild']
        }, {
            unique: false,
            fields: ['materiaUserIdParent', 'materiaUserIdChild']
        }],
        sequelize,
        freezeTableName: true
    });
    return Submateria;
};