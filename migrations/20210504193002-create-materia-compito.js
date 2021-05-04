'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('MateriaCompitos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            materiaId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            tipologia: {
                type: Sequelize.ENUM("scritto", "orale", "pratico"),
                allowNull: false,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            notifica: {
                type: Sequelize.INTEGER,
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
        await queryInterface.addIndex('MateriaCompitos', ['materiaId']);
        await queryInterface.addIndex('MateriaCompitos', ['materiaId', 'tipologia', 'data', 'notifica']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('MateriaCompitos');
    }
};