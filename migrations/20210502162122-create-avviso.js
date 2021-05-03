'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Avvisos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            creationDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            indiceColore: {
                type: Sequelize.STRING,
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
            titolo: {
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

        await queryInterface.addIndex('Avvisos', ['userId']);
        await queryInterface.addIndex('Avvisos', ['creationDate']);
        await queryInterface.addIndex('Avvisos', ['notifica']);
        await queryInterface.addIndex('Avvisos', ['titolo']);
        await queryInterface.addIndex('Avvisos', ['userId', 'notifica']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Avvisos');
    }
};