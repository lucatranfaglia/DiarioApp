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
            localita: {
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
        await queryInterface.addIndex('Istituto', ['localita']);
        await queryInterface.addIndex('Istituto', ['istituto', 'localita']);

        await queryInterface.addConstraint('Istituto', {
            fields: ['istituto', 'localita'],
            type: 'unique',
            name: 'custom_unique_constraint_name'
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Istituto');
    }
};