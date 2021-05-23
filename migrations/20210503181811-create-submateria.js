'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Submateria', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            materiaUserIdParent: {
                type: Sequelize.BIGINT(100),
                allowNull: false,
            },
            materiaUserIdChild: {
                type: Sequelize.BIGINT,
                allowNull: false,
                defaultValue: 0
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

        await queryInterface.addIndex('Submateria', ['id']);
        await queryInterface.addIndex('Submateria', ['materiaUserIdParent']);
        await queryInterface.addIndex('Submateria', ['materiaUserIdChild']);
        await queryInterface.addIndex('Submateria', ['id', 'materiaUserIdParent']);
        await queryInterface.addIndex('Submateria', ['id', 'materiaUserIdChild']);
        await queryInterface.addIndex('Submateria', ['id', 'materiaUserIdParent', 'materiaUserIdChild']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Submateria');
    }
};