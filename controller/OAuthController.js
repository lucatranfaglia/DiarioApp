const { loginFacebook } = require('../repository/OAuthRepository')

const controllerOAuthGoogle = async(username) => {
    try {

    } catch (error) {
        // use a valid logger
        console.log(error.message);
    }
};


const controllerOAuthFacebook = async(id, name) => {
    try {
        console.log("Controller facebook");
        await loginFacebook(id, name);
    } catch (error) {
        // use a valid logger
        console.log(error.message);
    }
};

module.exports = {
    controllerOAuthGoogle,
    controllerOAuthFacebook
}