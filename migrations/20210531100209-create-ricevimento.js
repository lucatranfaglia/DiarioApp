'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Ricevimentos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(100)
            },
            professoreId: {
                type: Sequelize.BIGINT(100)
            },
            giorno: {
                type: Sequelize.DATE
            },
            ora: {
                type: Sequelize.TIME
            },
            luogo: {
                type: Sequelize.STRING
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

        await queryInterface.addIndex('Ricevimentos', ['professoreId']);
        await queryInterface.addIndex('Ricevimentos', ['giorno']);
        await queryInterface.addIndex('Ricevimentos', ['ora']);
        await queryInterface.addIndex('Ricevimentos', ['giorno', 'ora']);
        await queryInterface.addIndex('Ricevimentos', ['professoreId', 'giorno', 'ora']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Ricevimentos');
    }
};