'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Submateria', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            materiaId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            compitiId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            votiId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            orarioId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            nomeSubmateria: {
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

        await queryInterface.addIndex('Submateria', ['materiaId']);
        await queryInterface.addIndex('Submateria', ['compitiId']);
        await queryInterface.addIndex('Submateria', ['votiId']);
        await queryInterface.addIndex('Submateria', ['orarioId']);
        await queryInterface.addIndex('Submateria', ['nomeSubmateria']);
        await queryInterface.addIndex('Submateria', ['materiaId', 'compitiId', 'votiId', 'orarioId', 'nomeSubmateria']);

    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Submateria');
    }
};