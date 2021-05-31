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
            professoreId: {
                type: Sequelize.BIGINT(100),
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM("aula", "laboratorio"),
                allowNull: false,
                defaultValue: "aula"
            },
            giustificazioni: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            crediti: {
                type: Sequelize.INTEGER,
                allowNull: true
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