'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('CompitiCasas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            materiaUserId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            priorita: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            stato: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            testo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            notifica: {
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

        await queryInterface.addIndex('CompitiCasas', ['stato']);
        await queryInterface.addIndex('CompitiCasas', ['testo']);
        await queryInterface.addIndex('CompitiCasas', ['priorita']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('CompitiCasas');
    }
};