'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Professores', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            istitutoId: {
                type: Sequelize.BIGINT,
                allowNull: false
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
                type: Sequelize.BIGINT,
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

        await queryInterface.addConstraint('Professores', {
            fields: ['nome', 'cognome', 'email'],
            type: 'unique',
            name: 'custom_unique_constraint_professori'
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Professores');
    }
};