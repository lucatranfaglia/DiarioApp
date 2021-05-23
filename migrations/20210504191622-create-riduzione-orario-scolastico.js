'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('RiduzioneOrarioScolasticos', {
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
            data: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            tipologia: {
                type: Sequelize.ENUM("ritardo", "entrata", "uscita"),
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

        await queryInterface.addIndex('RiduzioneOrarioScolasticos', ['userId', 'data', 'tipologia']);
        await queryInterface.addIndex('RiduzioneOrarioScolasticos', ['userId', 'data', 'tipologia', 'ora']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('RiduzioneOrarioScolasticos');
    }
};