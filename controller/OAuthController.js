const { loginFacebook } = require('../repository/AuthFacebookRepository');
const { getTwitterAuthorize, getTwitterAuthenticate, oauthGetUserById, getOAuthAccessTokenWith } = require('../repository/AuthTwitterRepository');

const controllerAuthGoogle = async(username) => {
    try {

    } catch (error) {
        // use a valid logger
        console.log(error.message);
        throw new Error("Error OAuthGoogle: ", error.message);
    }
};


const controllerAuthFacebook = async(id, social, name) => {
    try {
        console.log("Controller facebook", id, social, name);
        return await loginFacebook(id, social, name);
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};


const controllerAuthTwitter = async(req, res) => {
    try {
        console.log("Controller");
        const { oauthRequestToken, oauthRequestTokenSecret } = req.session
        const { oauth_verifier: oauthVerifier } = req.query

        const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
        req.session.oauthAccessToken = oauthAccessToken;

        console.log("Controller results: ", results);
        const { user_id: userId /*, screen_name */ } = results;
        const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret });

        req.session.twitter_screen_name = user.screen_name
        res.cookie('twitter_screen_name', user.screen_name, { maxAge: 900000, httpOnly: true })
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const controllerAuthTwitterAuthorize = async() => {
    try {
        console.log("Controlle");
        return await getTwitterAuthorize('authorize');
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const controllerAuthTwitterAuthenticate = async(req, res) => {
    try {
        console.log("Controlle");
        return await getTwitterAuthenticate(req, res);
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}


module.exports = {
    controllerAuthGoogle,
    controllerAuthFacebook,
    controllerAuthTwitter,
    controllerAuthTwitterAuthorize,
    controllerAuthTwitterAuthenticate
}