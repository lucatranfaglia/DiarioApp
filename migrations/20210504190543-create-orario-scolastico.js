'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('OrarioScolasticos', {
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
            materiaId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            subMateriaId: {
                type: Sequelize.BIGINT,
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
            nomeMateria: {
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

        await queryInterface.addIndex('OrarioScolasticos', ['userId']);
        await queryInterface.addIndex('OrarioScolasticos', ['userId', 'materiaId', 'subMateriaId']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('OrarioScolasticos');
    }
};