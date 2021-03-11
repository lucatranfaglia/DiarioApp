const { Router } = require('express');
const router = Router();


const { controllerAuthGoogle, controllerAuthFacebook, controllerAuthTwitter, controllerAuthTwitterAuthorize, controllerAuthTwitterAuthenticate } = require('../controller/OAuthController');


/**
 * @swagger
 * /auth/facebook:
 *   post:
 *     tags:
 *       - AuthFacebook
 *     description: Returns info to userr from facebook
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/facebook', async function(req, res, next) {
    try {
        console.log("body: ", req.body);
        const socialID = req.body.data.socialID;
        const name = req.body.data.name;
        const social = req.body.data.social;
        if (req.body) {
            const result = await controllerAuthFacebook(socialID, social, name);
            res.status(result ? 200 : 404)
                .json(result ? "facebook: aggiunto. " : "Error facebook: " + result)
        } else {
            console.log(new Error('Not valid social and username'));
            next(new Error('Not valid social and username')); //pass to error handler
        }
    } catch (error) {
        res.status(500).send("Error oauth google: " + error);
    }
});


/**
 * @swagger
 * /auth/google:
 *   post:
 *     tags:
 *       - AuthGoogle
 *     description: Returns info to userr from google
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/google', async function(req, res, next) {
    try {

        if (social != '' && username != '') {
            const result = await controllerAuthGoogle(social, username);
            res.status(result ? 200 : 404)
                .json(result ? "AnalisiSocial accountDeleteByUser: connessione avvenuta con successo. " + result : "Error accountDeleteByUser: " + result)
        } else {
            console.log(new Error('Not valid social and username'));
            next(new Error('Not valid social and username')); //pass to error handler
        }
    } catch (error) {
        res.status(500).send("Error oauth google: " + error);
    }
});




/**
 * @swagger
 * /auth/twitter:
 *   post:
 *     tags:
 *       - AuthTwitter
 *     description: Returns info to userr from twitter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.get('/twitter/', async function(req, res, next) {
    try {
        console.log("START");
        const result = await controllerAuthTwitter(req, res);
        console.log("result: ", result);
        return result;

    } catch (error) {
        res.status(500).send("Error oauth twitter: " + error);
    }
});


/**
 * @swagger
 * /auth/twitter/authorize:
 *   get:
 *     tags:
 *       - AuthTwitter
 *     description: Returns info to userr from twitter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.get('/twitter/authorize', async function(req, res, next) {
    try {
        console.log("START");
        const result = await controllerAuthTwitterAuthorize();
        console.log("result: ", result);

    } catch (error) {
        res.status(500).send("Error oauth twitter: " + error);
    }
});

router.get('/twitter/authenticate', async function(req, res, next) {
    try {
        console.log("START");
        const result = await controllerAuthTwitterAuthenticate(req, res);
        console.log("result: ", result);

    } catch (error) {
        res.status(500).send("Error oauth twitter: " + error);
    }
});

module.exports = router;