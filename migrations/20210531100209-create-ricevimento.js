'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Ricevimento', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            professoreId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            giorno: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            ora_inizio: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            ora_fine: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            luogo: {
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

        await queryInterface.addIndex('Ricevimento', ['ora_inizio']);
        await queryInterface.addIndex('Ricevimento', ['ora_fine']);
        await queryInterface.addIndex('Ricevimento', ['giorno', 'ora_inizio', 'ora_fine']);
        await queryInterface.addIndex('Ricevimento', ['professoreId', 'giorno', 'ora_inizio']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Ricevimento');
    }
};