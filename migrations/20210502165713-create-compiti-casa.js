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
            materiaId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            subMateriaId: {
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
        await queryInterface.addIndex('CompitiCasas', ['materiaId']);
        await queryInterface.addIndex('CompitiCasas', ['subMateriaId']);
        await queryInterface.addIndex('CompitiCasas', ['data']);
        await queryInterface.addIndex('CompitiCasas', ['userId', 'materiaId']);
        await queryInterface.addIndex('CompitiCasas', ['userId', 'subMateriaId']);
        await queryInterface.addIndex('CompitiCasas', ['userId', 'data']);
        await queryInterface.addIndex('CompitiCasas', ['userId', 'priorità']);
        await queryInterface.addIndex('CompitiCasas', ['userId', 'materiaId', 'subMateriaId']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('CompitiCasas');
    }
};