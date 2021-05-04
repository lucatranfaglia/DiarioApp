'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            assenzeSetId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            avvisiSetId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            compitiCasaSetId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            compitiSetId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            materieSetId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            orarioScolasticoSetId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            orarioSetId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            pagelleSetId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            isSelected: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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

        await queryInterface.addIndex('Users', ['id']);
        await queryInterface.addIndex('Users', ['isSelected']);
        await queryInterface.addIndex('Users', ['id', 'isSelected']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};