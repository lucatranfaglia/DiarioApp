'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('ProfessoreUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            istitutoId: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            materiaId: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            professoreId: {
                type: Sequelize.BIGINT,
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
        await queryInterface.dropTable('ProfessoreUsers');
    }
};