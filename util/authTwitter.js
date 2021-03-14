const oauth = require('oauth');
const { promisify } = require('util')

const TWITTER_CONSUMER_API_KEY = process.env.npm_config_twitter_consumer_api_key || process.env.TWITTER_CONSUMER_API_KEY
const TWITTER_CONSUMER_API_SECRET_KEY = process.env.npm_config_twitter_consumer_api_secret_key || process.env.TWITTER_CONSUMER_API_SECRET_KEY
const TWITTER_CALLBACK = process.env.TWITTER_CALLBACK;

// const oauthConsumer = new oauth.OAuth(
//     'https://twitter.com/oauth/request_token',
//     'https://twitter.com/oauth/access_token',
//     TWITTER_CONSUMER_API_KEY,
//     TWITTER_CONSUMER_API_SECRET_KEY,
//     '1.0A',
//     TWITTER_CALLBACK,
//     'HMAC-SHA1')

const oauth2 = new oauth.OAuth2(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    'https://api.twitter.com/', null, 'oauth2/token', null
)

/**
 * 
 * @param {*} userId 
 * @param {*} oauthAccessToken 
 * @param {*} oauthAccessTokenSecret 
 */
const oauthGetUserById = async(userId, { oauthAccessToken, oauthAccessTokenSecret } = {}) => {

    const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2));
    // return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
    //     .then(body => JSON.parse(body))
}

/**
 * 
 * @param {*} oauthRequestToken 
 * @param {*} oauthRequestTokenSecret 
 * @param {*} oauthVerifier 
 */
// const getOAuthAccessTokenWith = async({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) => {
//     return new Promise((resolve, reject) => {
//         console.log("getOAuthAccessTokenWith", oauthRequestToken, oauthRequestTokenSecret, oauthVerifier);
//         oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
//             console.log("getOAuthAccessTokenWith", results);
//             return error ?
//                 reject(new Error('Error getting OAuth access token')) :
//                 resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
//         })
//     })
// }


const getOAuthAccessTokenWith = async({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) => {

    console.log("getOAuthAccessTokenWith", oauthRequestToken, oauthRequestTokenSecret, oauthVerifier);
    const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2))
    const accessToken = await getOAuthAccessToken('', { grant_type: 'client_credentials' })

    return axios.get(`https://api.twitter.com/1.1/users/show.json?screen_name=${username}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => JSON.parse(res.body))
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
    oauthGetUserById,
    getOAuthAccessTokenWith,
    getOAuthRequestToken
}