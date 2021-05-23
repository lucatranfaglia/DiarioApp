'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('MateriaUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(100)
            },
            userId: {
                type: Sequelize.BIGINT(100),
                allowNull: false,
            },
            materiaId: {
                type: Sequelize.BIGINT(100),
                allowNull: false,
            },
            professore: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            laboratorio: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            giustificazioni: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            crediti: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
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
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('MateriaUsers');
    }
};