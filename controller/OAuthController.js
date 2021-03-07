const { loginFacebook } = require('../repository/OAuthRepository')

const controllerOAuthGoogle = async(username) => {
    try {

    } catch (error) {
        // use a valid logger
        console.log(error.message);
        throw new Error("Error OAuthGoogle: ", error.message);
    }
};


const controllerOAuthFacebook = async(id, social, name) => {
    try {
        console.log("Controller facebook", id, social, name);
        return await loginFacebook(id, social, name);
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

module.exports = {
    controllerOAuthGoogle,
    controllerOAuthFacebook
}