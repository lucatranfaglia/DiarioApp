const { normalizePort } = require('../lib/server');

const PORT = normalizePort(process.env.PORT || '4000');
const HOST = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

// SWAGGER 
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ExpApp API",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "",
            },
            contact: {
                name: "ExpApp",
                url: "",
                email: "ExpApp@email.com",
            },
        },
        servers: [{
                url: `http://${HOST}:${PORT}`,
                description: 'Local server'
            },

        ],
        basePath: '/',
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);


module.exports = {
    specs
}