const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true,
            options: {
                encrypt: true
            }
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true,
            options: {
                encrypt: true
            }
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};