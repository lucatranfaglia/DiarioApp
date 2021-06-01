'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(100)
            },
            userAuthId: {
                type: Sequelize.BIGINT(100),
                allowNull: false
            },
            istitutoId: {
                type: Sequelize.BIGINT(100),
                allowNull: false
            },
            nickname: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            anno: {
                type: Sequelize.INTEGER(5),
                allowNull: true
            },
            sezione: {
                type: Sequelize.STRING(5),
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
        await queryInterface.addIndex('Users', ['id']);
        await queryInterface.addIndex('Users', ['userAuthId']);
        await queryInterface.addIndex('Users', ['userAuthId', 'nickname']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};