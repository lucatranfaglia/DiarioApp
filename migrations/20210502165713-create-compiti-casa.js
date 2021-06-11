'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('CompitiCasa', {
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
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            priorita: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            stato: {
                type: Sequelize.ENUM("nuovo", "dacompletare", "completato"),
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

        await queryInterface.addIndex('CompitiCasa', ['stato']);
        await queryInterface.addIndex('CompitiCasa', ['testo']);
        await queryInterface.addIndex('CompitiCasa', ['priorita']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('CompitiCasa');
    }
};