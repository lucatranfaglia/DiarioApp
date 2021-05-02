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
            userId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            notifica: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            priorità: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            stato: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            testo: {
                type: Sequelize.STRING
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
        await queryInterface.addIndex('CompitiCasas', ['id']);
        await queryInterface.addIndex('CompitiCasas', ['userId']);
        await queryInterface.addIndex('CompitiCasas', ['data']);
        await queryInterface.addIndex('CompitiCasas', ['userId', 'data']);
        await queryInterface.addIndex('CompitiCasas', ['userId', 'priorità']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('CompitiCasas');
    }
};