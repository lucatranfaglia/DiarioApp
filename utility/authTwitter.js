const { default: axios } = require('axios')
const oauth = require('oauth')

const { promisify } = require('util')

const TWITTER_CONSUMER_API_KEY = process.env.TWITTER_CONSUMER_API_KEY
const TWITTER_CONSUMER_API_SECRET_KEY = process.env.TWITTER_CONSUMER_API_SECRET_KEY

const oauthConsumer = new oauth.OAuth(
    'https://twitter.com/oauth/request_token',
    'https://twitter.com/oauth/access_token',
    TWITTER_CONSUMER_API_KEY,
    TWITTER_CONSUMER_API_SECRET_KEY,
    '1.0A',
    process.env.TWITTER_CALLBACK,
    'HMAC-SHA1'
)

async function oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret } = {}) {
    return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
        .then(body => JSON.parse(body))
}
async function getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) {
    return new Promise((resolve, reject) => {

        console.log("oauthConsumer", oauthConsumer)

        oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
            return error ?
                reject(new Error('Error getting OAuth access token')) :
                resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
        })
    })
}
async function getOAuthRequestToken() {
    return new Promise((resolve, reject) => {
        oauthConsumer.getOAuthRequestToken(function(error, oauthRequestToken, oauthRequestTokenSecret, results) {
            return error ?
                reject(new Error('Error getting OAuth request token')) :
                resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
        })
    })
}


async function twitter(req, res, method = 'authorize') {
    console.log("req: ", method);


    console.log("req: ", req);

    console.log(`/twitter/${method}`)
    const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken()
    console.log(`/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })


    const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
    console.log('redirecting user to ', authorizationUrl)

    res.redirect
    const result = await axios.get(authorizationUrl);
    return result;
}


module.exports = {
    oauthGetUserById,
    getOAuthAccessTokenWith,
    getOAuthRequestToken,
    twitter
}