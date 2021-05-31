'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Professores', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(100)
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            cognome: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            telefono: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addIndex('Professores', ['id']);
        await queryInterface.addIndex('Professores', ['nome']);
        await queryInterface.addIndex('Professores', ['cognome']);
        await queryInterface.addIndex('Professores', ['nome', 'cognome']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Professores');
    }
};