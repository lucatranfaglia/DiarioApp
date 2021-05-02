const { Router } = require('express');
const router = Router();

const { controllerAuthTwitter, controllerAuthTwitterAuthorize, controllerAuthTwitterAuthenticate } = require('../controller/TwitterController');
const { controllerAuthFacebook } = require('../controller/FacebookController');
const { controllerAuthGoogle } = require('../controller/GoogleController');
const { controllerAuthApple } = require('../controller/AppleController');
const { controllerAuthTwitch } = require('../controller/TwitchController');

router.post('/facebook', async function(req, res, next) {
    try {
        if (req.body) {
            const result = await controllerAuthFacebook(req.body);
            res.status(result ? 200 : 404).json(result ? "facebook: aggiunto. " : "Error facebook: " + result)
        } else {
            console.log(new Error('Not valid social and username'));
            next(new Error('Not valid social and username')); //pass to error handler
        }
    } catch (error) {
        res.status(500).send("Error oauth facebook: " + error);
    }
});


router.post('/google', async function(req, res, next) {
    try {
        const result = await controllerAuthGoogle(req.body);
        if (result) {
            if (result[0]) {
                res.status(result[0] ? 200 : 404).json(result[0] ? result[0] : "Error google result")
            } else {
                res.status(result ? 200 : 404).json(result ? result : "Error google")
            }
        } else {
            console.log(new Error('Error login google'));
            next(new Error('Error login google')); //pass to error handler
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send("Error oauth google: " + error);
    }
});

router.get('/twitter/callback', async function(req, res, next) {
    try {
        const result = await controllerAuthTwitter(req, res);
        res.status(result ? 200 : 404).json(result ? result : "Error callback twitter result")
    } catch (error) {
        res.status(500).send("Error oauth twitter: " + error);
    }
});

router.get('/twitter/authorize', async function(req, res, next) {
    try {
        const result = await controllerAuthTwitterAuthorize(req, res);
        res.status(result ? 200 : 404).json(result ? result : "Error callback twitter result")
    } catch (error) {
        res.status(500).send("Error oauth twitter: " + error);
    }
});

router.get('/twitter/authenticate', async function(req, res, next) {
    try {
        const result = await controllerAuthTwitterAuthenticate(req, res);
        res.status(result ? 200 : 404).json(result ? result : "Error callback twitter result")
    } catch (error) {
        res.status(500).send("Error oauth twitter: " + error);
    }
});


router.get('/apple/authenticate', async function(req, res, next) {
    try {
        const result = await controllerAuthApple(req, res);
        res.status(result ? 200 : 404).json(result ? result : "Error callback Apple result")
    } catch (error) {
        res.status(500).send("Error oauth twitter: " + error);
    }
});



router.get('/twitch/authenticate', async function(req, res, next) {
    try {

        const result = await controllerAuthTwitch(req, res);
        res.status(result ? 200 : 404).json(result ? result : "Error callback twitch result")
    } catch (error) {
        res.status(500).send("Error oauth twitter: " + error);
    }
});


router.get('/twitch/callback', async function(req, res, next) {
    try {
        const { access_token } = req.query;
        const result = await (req, res);
        res.status(result ? 200 : 404).json(result ? result : "Error callback twitch result")
    } catch (error) {
        res.status(500).send("Error oauth twitch: " + error);
    }
});

module.exports = router;