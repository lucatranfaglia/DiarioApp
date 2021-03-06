const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const path = require('path')

const morgan = require('morgan')

const User = require('./models').User;

const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');


// CONTROLLER
const { controllerOAuth } = require('./controller/OAuthController');

// ROUTES
const { routerOAuth } = require('./routes/OAuthRoutes');

// 
const { normalizePort, onError, onListening } = require('./lib/server');

const PORT = normalizePort(process.env.PORT || '4000');
const HOST = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

class Server {
    // async configs(){
    configs() {
        this.app = express();
    }

    middlewares() {

    }

    setRoutes() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.app.use(morgan('combined'))

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(new FacebookStrategy({
                clientID: process.env.CLIENT_ID_FB,
                clientSecret: process.env.CLIENT_SECRET_FB,
                callbackURL: "http://localhost:4002/auth/facebook/callback"
            },
            function(accessToken, refreshToken, profile, cb) {
                console.log("AA", accessToken, refreshToken, profile)
                User.findOrCreate({ facebookId: profile.id }, function(err, user) {
                    return cb(err, user);
                });
            }
        ));

        this.app.get('/auth/facebook',
            passport.authenticate('facebook'));

        this.app.get('/auth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/' }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
            });

        // AUTH        
        this.app.use('/oauth', routerOAuth(controllerOAuth));

        // this.app.use('/login-with-facebook', async(req, res) => {
        //     const { accessToken, userID } = req.body;
        //     const response = await fetch(`https://graph.facebook.com/v10.0/me?access_token=${accessToken}&method=get&pretty=0`);
        //     const json = await response.json();
        //     console.log("res: ", res);
        //     if (json.userID === userID) {} else {}
        // });

        this.app.use('/', express.static(path.join(__dirname, 'template')));
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