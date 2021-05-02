const {
    oauthGetUserById,
    getOAuthAccessTokenWith,
    getOAuthRequestToken,
    twitter
} = require('../utility/authTwitter')
const User = require('../models').User

// TWITTER CALLBACK
const controllerAuthTwitter = async(req, res) => {
    try {
        return await getTwitterCallback(req, res);
    } catch (error) {
        throw new Error(error.message);
    }
};

const controllerAuthTwitterAuthorize = async(req, res) => {
    try {
        await getTwitterAuthorize(req, res);
    } catch (error) {
        console.log("Error Twitter authorize: ", error);
        throw new Error(error.message);
    }
};

const controllerAuthTwitterAuthenticate = async(req, res) => {
    try {
        await getTwitterAuthenticate(req, res);
    } catch (error) {
        console.log("Error Twitter Authenticate: ", error);
        throw new Error(error.message);
    }
}

// -------------------------------------------------
// -------------------------------------------------
// ---------------- FUNCTION -----------------------
// -------------------------------------------------
// -------------------------------------------------
const getTwitterCallback = async(req, res) => {
    // 1. REQUEST TOKEN
    const { oauthRequestToken, oauthRequestTokenSecret } = req.session
    const { oauth_verifier: oauthVerifier } = req.query

    // 2. Access with Token
    const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier });
    req.session.oauthAccessToken = oauthAccessToken
    const { user_id: userId } = results

    // 3. Get user 
    const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret });
    // save info and redirect home
    req.session.twitter_screen_name = user.screen_name;
    res.cookie("twitter_screen_name", user.screen_name, { maxAge: 900000, httpOnly: true });

    const result = await SaveUserTwitter(user);
    if (result)
        res.redirect('/');
}


const getTwitterAuthorize = async(req, res) => {
    const method = 'authorize';
    await twitter(req, res, method);
}

const getTwitterAuthenticate = async(req, res) => {
    const method = 'authenticate';
    await twitter(req, res, method);
}



/**
 * Save User with Twitter
 * 
 * @param (object) user
 */
const SaveUserTwitter = async(user) => {
    try {

        const socialId = user.id_str;
        const name = user.name;
        const locale = user.location;
        const picture = user.profile_image_url;

        const saveUser = await User.findOne({
            where: {
                socialId,
                social: 'twitter'
            }
        })
        if (saveUser) {
            return await User.update({
                locale,
                picture
            }, {
                where: {
                    socialId,
                    social: 'twitter'
                }
            })
        } else {
            return await User.create({
                socialId,
                name,
                locale,
                picture,
                social: 'twitter'
            })
        }

    } catch (error) {
        console.log("Twitter not save user!: ", error)
        throw new Error('Twitter not save user: ', error);
    }
}


module.exports = {
    controllerAuthTwitter,
    controllerAuthTwitterAuthorize,
    controllerAuthTwitterAuthenticate
}