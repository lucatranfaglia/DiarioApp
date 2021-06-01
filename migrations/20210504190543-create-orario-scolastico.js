'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('OrarioScolasticos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(100)
            },
            materiaUserId: {
                type: Sequelize.BIGINT(100),
                allowNull: false,
            },
            aula: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            giornoSettimana: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ora: {
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

        await queryInterface.addIndex('OrarioScolasticos', ['id']);
        await queryInterface.addIndex('OrarioScolasticos', ['materiaUserId']);
        await queryInterface.addIndex('OrarioScolasticos', ['materiaUserId', 'giornoSettimana']);
        await queryInterface.addIndex('OrarioScolasticos', ['materiaUserId', 'ora']);
        await queryInterface.addIndex('OrarioScolasticos', ['materiaUserId', 'aula']);
        await queryInterface.addIndex('OrarioScolasticos', ['materiaUserId', 'aula', 'giornoSettimana']);
        await queryInterface.addIndex('OrarioScolasticos', ['materiaUserId', 'aula', 'giornoSettimana', 'ora']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('OrarioScolasticos');
    }
};