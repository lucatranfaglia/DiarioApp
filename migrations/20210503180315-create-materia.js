'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Materia', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });

        await queryInterface.addIndex('Materia', ['nome']);
        await queryInterface.addConstraint('Materia', {
            fields: ['nome'],
            type: 'unique',
            name: 'custom_unique_constraint_materia_name'
        });

    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Materia');
    }
};