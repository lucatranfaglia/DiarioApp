'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Materia', {
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
            compiticaCasaId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            orarioId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            pagellaId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            submaterieSetId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            votiSetId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            colore: {
                type: Sequelize.STRING,
                allowNull: false
            },
            dataCompito: {
                type: Sequelize.DATE,
                allowNull: false
            },
            dataInterrogazione: {
                type: Sequelize.DATE,
                allowNull: false
            },
            dataPratico: {
                type: Sequelize.DATE,
                allowNull: false
            },
            giustificazioni: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            nomeMateria: {
                type: Sequelize.STRING,
                allowNull: false
            },
            notificaCompito: {
                type: Sequelize.STRING,
                allowNull: false
            },
            notificaInterrogazione: {
                type: Sequelize.STRING,
                allowNull: false
            },
            notificaPratico: {
                type: Sequelize.STRING,
                allowNull: false
            },
            professore: {
                type: Sequelize.STRING,
                allowNull: false
            },
            votoPagella: {
                type: Sequelize.INTEGER,
                allowNull: false
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

        await queryInterface.addIndex('Materia', ['userId']);
        await queryInterface.addIndex('Materia', ['compiticaCasaId']);
        await queryInterface.addIndex('Materia', ['orarioId']);
        await queryInterface.addIndex('Materia', ['pagellaId']);
        await queryInterface.addIndex('Materia', ['submaterieSetId']);
        await queryInterface.addIndex('Materia', ['votiSetId']);
        await queryInterface.addIndex('Materia', ['userId', 'compiticaCasaId', 'orarioId', 'pagellaId', 'submaterieSetId', 'votiSetId']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Materia');
    }
};