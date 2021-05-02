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

        await queryInterface.addIndex('UsersAuth', ['userId']);
        await queryInterface.addIndex('UsersAuth', ['creationDate']);
        await queryInterface.addIndex('UsersAuth', ['notifica']);
        await queryInterface.addIndex('UsersAuth', ['titolo']);
        await queryInterface.addIndex('UsersAuth', ['userId', 'notifica']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Avvisos');
    }
};