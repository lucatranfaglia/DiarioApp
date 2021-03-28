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

// 1. REQUEST TOKEN
async function getOAuthRequestToken() {
    return new Promise((resolve, reject) => {
        oauthConsumer.getOAuthRequestToken(function(error, oauthRequestToken, oauthRequestTokenSecret, results) {
            return error ?
                reject(new Error('Error getting OAuth request token')) :
                resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
        })
    })
}

// 2. Access with Token
async function getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) {
    return new Promise((resolve, reject) => {
        oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
            return error ?
                reject(new Error('Error getting OAuth access token')) :
                resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
        })
    })
}

// 3. Get UserById
async function oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret } = {}) {
    return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
        .then(body => JSON.parse(body))
}




// Method Twitter authorize | authenticate
async function twitter(req, res, method = 'authorize') {
    try {
        // 1. REQUEST TOKEN
        const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken()

        // 2. AUTH Url
        const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`

        req.session = req.session || {}
        req.session.oauthRequestToken = oauthRequestToken
        req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

        res.redirect(authorizationUrl);
    } catch (error) {
        throw new Error("Twitter authorize: ", error);
    }
}



module.exports = {
    oauthGetUserById,
    getOAuthAccessTokenWith,
    getOAuthRequestToken,
    twitter
}