const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');


const ehb = require('express-handlebars');
// config Engine
let hbs = ehb.create({
    defaultLayout: 'main',
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});


const cookieParser = require('cookie-parser');

const path = require('path')


const logger = require('morgan')

// ------------------------------------
// FLASH: connect-flash
// ------------------------------------
const flash = require('connect-flash');


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
        this.app.engine('.hbs', hbs.engine);
        this.app.set('view engine', '.hbs');

        // public (js & css) - alias del percorso '/public'
        this.app.use('/public', express.static(path.join(__dirname, 'public')));

        // axios - alias percorso '/axios'
        this.app.use('/axios', express.static(path.join(__dirname, 'node_modules', 'axios', 'dist')));

        // CSS Bootstrap - (rinominiamo il percorso con /bootstrap)
        this.app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

        // sweetalert2 - alias del percorso '/sweetalert2'
        this.app.use('/sweetalert2', express.static(path.join(__dirname, 'node_modules', 'sweetalert2', 'dist')));


        // FLASH
        this.app.use(flash());

        this.app.use(cookieParser())
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