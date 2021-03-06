const { loginFacebook } = require('../repository/OAuthRepository')

const controllerOAuthGoogle = async(username) => {
    try {

    } catch (error) {
        // use a valid logger
        console.log(error.message);
    }
};


const controllerOAuthFacebook = async(accessToken, userID) => {
    try {
        await loginFacebook(accessToken, userID);
    } catch (error) {
        // use a valid logger
        console.log(error.message);
    }
};

module.exports = {
    controllerOAuthGoogle,
    controllerOAuthFacebook
}