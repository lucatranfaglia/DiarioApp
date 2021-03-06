const { Router } = require('express');
const router = Router();


const { controllerOAuthGoogle, controllerOAuthFacebook } = require('../controller/OAuthController');


const routerOAuth = (controllerOAuth) => {

    // router.post('/facebook', async function(req, res, next) {
    //     try {
    //         const { accessToken, userID } = req.body;
    //         // const url=`https://`
    //         // const res = await fetch()
    //         if (accessToken != '' && userID != '') {
    //             const result = await controllerOAuthFacebook(accessToken, userID);
    //             res.status(result ? 200 : 404)
    //                 .json(result ? "AnalisiSocial accountDeleteByUser: connessione avvenuta con successo. " + result : "Error accountDeleteByUser: " + result)
    //         } else {
    //             console.log(new Error('Not valid social and username'));
    //             next(new Error('Not valid social and username')); //pass to error handler
    //         }
    //     } catch (error) {
    //         res.status(500).send("Error oauth google: " + error);
    //     }
    // });

    router.post('/google', async function(req, res, next) {
        try {

            if (social != '' && username != '') {
                const result = await controllerOAuthGoogle(social, username);
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

    return router;
}

module.exports = { routerOAuth }