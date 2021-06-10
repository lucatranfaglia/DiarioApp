'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('MateriaVoti', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            materiaUserId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            tipologia: {
                type: Sequelize.ENUM("scritto", "orale", "pratico", "giustificazione"),
                allowNull: false,
            },
            voto: {
                type: Sequelize.FLOAT,
                allowNull: true,
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
        await queryInterface.addIndex('MateriaVoti', ['materiaUserId']);
        await queryInterface.addIndex('MateriaVoti', ['materiaUserId', 'tipologia', 'data', 'notifica']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('MateriaVoti');
    }
};