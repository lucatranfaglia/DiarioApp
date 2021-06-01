'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('UserAuths', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: true,
                validate: {
                    len: [2, 20]
                }
            },
            surname: {
                type: Sequelize.STRING(50),
                allowNull: true,
                validate: {
                    len: [2, 10]
                }
            },
            username: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            psw: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            birth_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            city: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            fiscal_code: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            phone: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            gender: {
                type: Sequelize.STRING(2),
                allowNull: true
            },
            social: {
                type: Sequelize.STRING(10),
                allowNull: true
            },
            social_id: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            flag_marketing: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            flag_personal_data: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            flag_privacy: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            device_info: {
                type: Sequelize.JSON,
                allowNull: false,
                defaultValue: {}
            },
            user_profile: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'USER'
            },
            status: {
                type: Sequelize.ENUM('CREATED', 'ACTIVE', 'SUSPENDED', 'DELETED'),
                allowNull: false,
                defaultValue: 'CREATED'
            },
            additional_info: {
                type: Sequelize.JSON,
                allowNull: false,
                defaultValue: {}
            },
            locale: {
                type: Sequelize.STRING(25),
                allowNull: true
            },
            picture: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            update_info: {
                type: Sequelize.JSON,
                allowNull: false,
                defaultValue: {}
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

        await queryInterface.addIndex('UserAuths', ['id']);
        await queryInterface.addIndex('UserAuths', ['name']);
        await queryInterface.addIndex('UserAuths', ['surname']);
        await queryInterface.addIndex('UserAuths', ['username']);
        await queryInterface.addIndex('UserAuths', ['id', 'status']);
        await queryInterface.addIndex('UserAuths', ['id', 'email']);
        await queryInterface.addIndex('UserAuths', ['id', 'social']);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('UserAuths');
    }
};