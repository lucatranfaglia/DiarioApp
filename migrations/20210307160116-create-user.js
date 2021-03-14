'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.BIGINT(100),
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            social: {
                type: Sequelize.STRING(10),
                allowNull: true
            },
            socialId: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            locale: {
                type: Sequelize.STRING,
                allowNull: true
            },
            picture: {
                type: Sequelize.STRING(100),
                allowNull: true
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
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};