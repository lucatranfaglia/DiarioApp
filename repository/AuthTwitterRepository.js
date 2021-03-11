const dotenv = require('dotenv');
dotenv.config();
const oauth = require('oauth');

const { promisify } = require('util')

const oauthConsumer = new oauth.OAuth(
    'https://twitter.com/oauth/request_token',
    'https://twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_API_KEY,
    process.env.TWITTER_CONSUMER_API_SECRET_KEY,
    '1.0A',
    process.env.TWITTER_CALLBACK,
    'HMAC-SHA1')



const getTwitterAuthorize = async(method = 'authorize') => {
    console.log("getTwitter: ", `/auth/twitter/${method}`);

    console.log(`/auth/twitter/${method}`);
    // const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken();
    return await getOAuthRequestToken();
    console.log(`/auth/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })

    // req.session = req.session || {}
    // req.session.oauthRequestToken = oauthRequestToken
    // req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

    // const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
    // console.log('redirecting user to', authorizationUrl)
    // res.redirect(authorizationUrl)

}

const getTwitterAuthenticate = async(req, res) => {
    const method = 'authenticate';
    console.log("getTwitter: ", `/auth/twitter/${method}`);

    console.log(`/auth/twitter/${method}`);
    // const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken();
    const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken();
    console.log(`/auth/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })

    req.session = req.session || {}
    req.session.oauthRequestToken = oauthRequestToken
    req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

    const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
    console.log('redirecting user to', authorizationUrl)
    res.redirect(authorizationUrl)

}

/**
 * 
 * @param {*} userId 
 * @param {*} oauthAccessToken 
 * @param {*} oauthAccessTokenSecret 
 */
const oauthGetUserById = async(userId, { oauthAccessToken, oauthAccessTokenSecret } = {}) => {
    return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
        .then(body => JSON.parse(body))
}


/**
 * 
 * @param {*} oauthRequestToken 
 * @param {*} oauthRequestTokenSecret 
 * @param {*} oauthVerifier 
 */
const getOAuthAccessTokenWith = async({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) => {
    console.log("getOAuthRequestToken");
    return new Promise((resolve, reject) => {
        oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
            return error ?
                reject(new Error('Error getting OAuth access token')) :
                resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
        })
    })
}

/**
 * 
 */
const getOAuthRequestToken = async() => {
    console.log("getOAuthRequestToken");
    return new Promise((resolve, reject) => {
        oauthConsumer.getOAuthRequestToken(function(error, oauthRequestToken, oauthRequestTokenSecret, results) {
            return error ?
                reject(new Error('Error getting OAuth request token')) :
                resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
        })
    })
}


module.exports = {
    getTwitterAuthorize,
    getTwitterAuthenticate,
    oauthGetUserById,
    getOAuthAccessTokenWith,
    getOAuthRequestToken
}