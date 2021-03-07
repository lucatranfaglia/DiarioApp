const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');

const path = require('path')
const logger = require('morgan')

// ------------------------------------
// FLASH: connect-flash
// ------------------------------------
const flash = require('connect-flash');

// ROUTES
const { routerOAuth } = require('./routes/OAuthRoutes');

// const { routerLanding } = require('./routes/LandingRoutes');

// LIB
const { normalizePort, onError, onListening } = require('./lib/server');

const PORT = normalizePort(process.env.PORT || '4000');
const HOST = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

// SWAGGER
const swaggerUi = require("swagger-ui-express");
const { specs } = require('./util/swagger');
/**
 * --------------------------------------------------
 */

class Server {
    // async configs(){
    configs() {
        this.app = express();

        // TEMPLATE ENGINE - REACT
        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'jsx');
        this.app.engine('jsx', require('express-react-views').createEngine());

        // FLASH
        this.app.use(flash());
    }

    middlewares() {

    }

    setRoutes() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());


        // ------------------------------------
        // HTTP request logger middleware for node.js
        // ------------------------------------
        this.app.use(logger('dev'));

        // axios - alias percorso '/axios'
        this.app.use('/axios', express.static(path.join(__dirname, 'node_modules', 'axios', 'dist')));

        // sweetalert2 - alias del percorso '/sweetalert2'
        this.app.use('/sweetalert2', express.static(path.join(__dirname, 'node_modules', 'sweetalert2', 'dist')));

        this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs, { explorer: true })
        )

        // ------------------------------------
        // ROUTES
        // ------------------------------------


        this.app.use('/', require('./routes/LandingRoutes'));
        this.app.use('/auth', require('./routes/OAuthRoutes'));

    }

    main() {
        this.configs();
        this.middlewares();
        this.setRoutes();
        this.app.listen(PORT, HOST, () => {
            const address = `http://${HOST}:${PORT}`;
            console.log(`Server in ascolto all'indirizzo: ${address}`);
        });
        this.app.on('error', onError);
        this.app.on('listening', onListening);
    }
}

new Server().main()