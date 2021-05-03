'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Compitos', {
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
            testo: {
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
        await queryInterface.addIndex('Compitos', ['id']);
        await queryInterface.addIndex('Compitos', ['userId']);
        await queryInterface.addIndex('Compitos', ['data']);
        await queryInterface.addIndex('Compitos', ['userId', 'data']);
        await queryInterface.addIndex('Compitos', ['userId', 'data', 'notifica']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Compitos');
    }
};