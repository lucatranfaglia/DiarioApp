'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Votos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            materiaId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            submateriaId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            isOrale: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            tipo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            voto: {
                type: Sequelize.INTEGER,
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

        await queryInterface.addIndex('Votos', ['materiaId']);
        await queryInterface.addIndex('Votos', ['submateriaId']);
        await queryInterface.addIndex('Votos', ['data']);
        await queryInterface.addIndex('Votos', ['isOrale']);
        await queryInterface.addIndex('Votos', ['materiaId', 'submateriaId', 'data']);
        await queryInterface.addIndex('Votos', ['materiaId', 'submateriaId', 'data', 'isOrale']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Votos');
    }
};