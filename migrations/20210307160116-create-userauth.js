'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('UsersAuth', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.BIGINT(100),
                allowNull: true
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

        await queryInterface.addIndex('UsersAuth', ['userId']);
        await queryInterface.addIndex('UsersAuth', ['name']);
        await queryInterface.addIndex('UsersAuth', ['email']);
        await queryInterface.addIndex('UsersAuth', ['social']);
        await queryInterface.addIndex('UsersAuth', ['userId', 'email']);
        await queryInterface.addIndex('UsersAuth', ['userId', 'social']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('UsersAuth');
    }
};