'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            userAuthId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            istitutoId: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            status: {
                type: Sequelize.ENUM('ACTIVE', 'SUSPENDED', 'DELETED'),
                allowNull: false,
                defaultValue: 'ACTIVE'
            },
            nickname: {
                type: Sequelize.STRING(255),
                allowNull: true,
                validate: {
                    len: [2, 10]
                }
            },
            anno: {
                type: Sequelize.INTEGER,
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
        await queryInterface.addIndex('User', ['id']);
        await queryInterface.addIndex('User', ['userAuthId']);
        await queryInterface.addIndex('User', ['userAuthId', 'nickname']);


        await queryInterface.addConstraint('User', {
            fields: ['userAuthId'],
            type: 'foreign key',
            name: 'custom_fkey_constraint_userAuth',
            references: { //Required field
                table: 'UserAuth',
                field: 'id'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        });

        // await queryInterface.addConstraint('User', {
        //     fields: ['istitutoId'],
        //     type: 'foreign key',
        //     name: 'custom_fkey_constraint_userIstituto',
        //     references: { //Required field
        //         table: 'Istitutos',
        //         field: 'id'
        //     },
        //     onDelete: 'NO ACTION',
        //     onUpdate: 'NO ACTION'
        // });

    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('User');
    }
};