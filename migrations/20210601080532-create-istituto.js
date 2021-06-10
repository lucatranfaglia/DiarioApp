'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Istituto', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            istituto: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            citta: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.addIndex('Istituto', ['istituto']);
        await queryInterface.addIndex('Istituto', ['citta']);
        await queryInterface.addIndex('Istituto', ['istituto', 'citta']);

        await queryInterface.addConstraint('Istituto', {
            fields: ['istituto', 'citta'],
            type: 'unique',
            name: 'custom_unique_constraint_name'
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Istituto');
    }
};