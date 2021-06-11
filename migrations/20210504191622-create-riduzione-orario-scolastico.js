'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('RiduzioneOrarioScolastico', {
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
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            tipologia: {
                type: Sequelize.ENUM("ritardo", "entrata", "uscita"),
                allowNull: false,
            },
            ora: {
                type: Sequelize.FLOAT,
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

        await queryInterface.addIndex('RiduzioneOrarioScolastico', ['userId', 'data', 'tipologia']);
        await queryInterface.addIndex('RiduzioneOrarioScolastico', ['userId', 'data', 'tipologia', 'ora']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('RiduzioneOrarioScolastico');
    }
};