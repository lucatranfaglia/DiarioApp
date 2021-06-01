'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Istitutos', {
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
        await queryInterface.addIndex('Istitutos', ['istituto']);
        await queryInterface.addIndex('Istitutos', ['localita']);
        await queryInterface.addIndex('Istitutos', ['istituto', 'localita']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Istitutos');
    }
};