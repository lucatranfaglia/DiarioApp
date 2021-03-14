const { loginFacebook } = require('../repository/AuthFacebookRepository');
const { loginGoogle } = require('../repository/AuthGoogleRepository');
const { getTwitterCallback, getTwitterAuthorize, getTwitterAuthenticate } = require('../repository/AuthTwitterRepository');


/**
 * Auth Google - ottengo le info dell'utente tramite il token
 * @param {string} idtoken 
 */
const controllerAuthGoogle = async(idtoken) => {
    try {
        if (!idtoken) {
            throw new Error('Google token not found!');
        }
        return await loginGoogle(idtoken);

    } catch (error) {
        console.log(error.message);
        throw new Error("Error OAuthGoogle: ", error.message);
    }
};

/**
 * 
 * @param {int} id 
 * @param {string} social 
 * @param {string} name 
 */
const controllerAuthFacebook = async(id, social, name) => {
    try {
        if (!id || !social || !name) {
            throw new Error('Facebook info not found!');
        }
        return await loginFacebook(id, social, name);
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};


const controllerAuthTwitter = async(req, res) => {
    try {
        console.log("controllerAuthTwitter");
        return await getTwitterCallback(req, res);
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const controllerAuthTwitterAuthorize = async(req, res) => {
    try {
        console.log("controllerAuthTwitterAuthorize");
        return await getTwitterAuthorize(req, res);
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const controllerAuthTwitterAuthenticate = async(req, res) => {
    try {
        console.log("controllerAuthTwitterAuthenticate");
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