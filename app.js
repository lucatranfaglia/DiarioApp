const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');


require('./services/db.service');

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

const flash = require('connect-flash');


// LIB
const { normalizePort, onError, onListening } = require('./utility/server');


const PORT = normalizePort(process.env.PORT || '4000');
const HOST = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
const SESSION_SECRET = process.env.npm_config_cookie_secret || process.env.SESSION_SECRET

// SWAGGER
const swaggerUi = require("swagger-ui-express");
const { specs } = require('./utility/swagger');
/**
 * --------------------------------------------------
 */

class Server {
    // async configs(){
    configs() {
        this.app = express();

        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        // Logger
        this.app.use(logger('dev'));

        // Cookie
        this.app.use(cookieParser())

        // Session
        this.app.use(session({
            secret: SESSION_SECRET || 'secret',
        }));


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

        // swaggerUi
        this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs, { explorer: true })
        )
    }

    middlewares() {}

    setRoutes() {
        // ------------------------------------
        // ROUTES
        // ------------------------------------
        this.app.use('/', require('./routes/LandingRoutes'));
        this.app.use('/auth', require('./routes/LoginSocialRoutes'));


        this.app.use('/user', require('./routes/api/UserRoutes'));
        this.app.use('/materia', require('./routes/api/MateriaRoutes'));
        this.app.use('/professore', require('./routes/api/ProfessoreRoutes'));

        this.app.use('/avviso', require('./routes/api/AvvisoRoutes'));
        this.app.use('/assenza', require('./routes/api/AssenzaRoutes'));
        this.app.use('/ros', require('./routes/api/RosRoutes'));

        this.app.use('/voti', require('./routes/api/MateriaVotiRoutes'));


        this.app.use('/compiti', require('./routes/api/CompitiCasaRoutes'));
        this.app.use('/orario', require('./routes/api/OrarioScolasticoRoutes'));
        this.app.use('/submateria', require('./routes/api/SubMateriaRoutes'));

        this.app.use('/pagella', require('./routes/api/PagellaRoutes'));

        this.app.use('/view', require('./routes/api/ViewRoutes'));
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