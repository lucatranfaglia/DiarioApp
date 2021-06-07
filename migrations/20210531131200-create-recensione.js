'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Recensiones', {
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
            titolo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            descrizione: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            voto: {
                type: Sequelize.INTEGER,
                allowNull: true,
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

        await queryInterface.addIndex('Recensiones', ['professoreId']);
        await queryInterface.addIndex('Recensiones', ['professoreId', 'titolo']);
        await queryInterface.addIndex('Recensiones', ['professoreId', 'voto']);
        await queryInterface.addIndex('Recensiones', ['professoreId', 'titolo', 'voto']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Recensiones');
    }
};