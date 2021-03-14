const {
    oauthGetUserById,
    getOAuthAccessTokenWith,
    getOAuthRequestToken
} = require('../util/authTwitter');


const getTwitterCallback = async(req, res) => {
    console.log("START getTwitterCallback");
    console.log("req.session: ", req.session);
    console.log("req.query: ", req.query);

    const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken();

    const { oauth_verifier: oauthVerifier } = req.query
    console.log('/twitter/callback', { oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })

    const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
    req.session.oauthAccessToken = oauthAccessToken

    console.log("results: ", results);
    const { user_id: userId /*, screen_name */ } = results
    const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret })

    req.session.twitter_screen_name = user.screen_name
    res.cookie('twitter_screen_name', user.screen_name, { maxAge: 900000, httpOnly: true })

    console.log('user succesfully logged in with twitter', user.screen_name)
    req.session.save(() => res.redirect('/'))
}


const getTwitterAuthorize = async(req, res) => {
    console.log("START getTwitterAuthorize");

    const method = 'authorize';

    console.log(`/auth/twitter/${method}`);

    const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken();
    console.log(`/auth/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })

    req.session = req.session || {}
    req.session.oauthRequestToken = oauthRequestToken
    req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

    const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
    console.log('redirecting user to', authorizationUrl)
    res.redirect(authorizationUrl)

}

const getTwitterAuthenticate = async(req, res) => {
    console.log("START getTwitterAuthenticate");

    const method = 'authenticate';

    console.log(`/auth/twitter/${method}`);

    const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken();
    console.log(`/auth/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })

    req.session = req.session || {}
    req.session.oauthRequestToken = oauthRequestToken
    req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

    const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
    console.log('redirecting user to', authorizationUrl)
    res.redirect(authorizationUrl)

}

module.exports = {
    getTwitterCallback,
    getTwitterAuthorize,
    getTwitterAuthenticate,
}