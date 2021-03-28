const {
    oauthGetUserById,
    getOAuthAccessTokenWith,
    getOAuthRequestToken,
    twitter
} = require('../util/authTwitter');


const getTwitterCallback = async(req, res) => {
    // const { oauthRequestToken, oauthRequestTokenSecret } = req.session

    const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken()
    const { oauth_verifier: oauthVerifier } = req.query
    console.log('/twitter/callback', { oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })

    const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
    req.session.oauthAccessToken = oauthAccessToken

    const { user_id: userId /*, screen_name */ } = results
    const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret })

    req.session.twitter_screen_name = user.screen_name
    res.cookie('twitter_screen_name', user.screen_name, { maxAge: 900000, httpOnly: true })

    console.log('user succesfully logged in with twitter', user.screen_name)

}


const getTwitterAuthorize = async(req, res) => {
    const method = 'authorize';
    const result = await twitter(method);

    return result;

}

const getTwitterAuthenticate = async(req, res) => {
    console.log("RepositoryTwitterAuthenticate");

    const method = 'authenticate';

    const result = await twitter(req, res, method);
    return result;
}

module.exports = {
    getTwitterCallback,
    getTwitterAuthorize,
    getTwitterAuthenticate,
}