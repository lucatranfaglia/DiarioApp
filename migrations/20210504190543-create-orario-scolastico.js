'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('OrarioScolastico', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            materiaUserId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            aula: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            giornoSettimana: {
                type: Sequelize.ENUM('Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'),
                allowNull: false,
            },
            ora_inizio: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            ora_fine: {
                type: Sequelize.TIME,
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

        await queryInterface.addIndex('OrarioScolastico', ['materiaUserId', 'aula', 'giornoSettimana', 'ora_inizio', 'ora_fine']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('OrarioScolastico');
    }
};