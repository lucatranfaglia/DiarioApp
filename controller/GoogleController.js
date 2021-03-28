const User = require('../model').User

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID)


/**
 * Auth Google - ottengo le info dell'utente tramite il token
 * @param {array} data 
 */
const controllerAuthGoogle = async(data) => {
    try {
        const { idtoken } = data;

        if (!idtoken) {
            throw new Error('Google token not found!');
        }
        return await SaveUserGoogle(idtoken);

    } catch (error) {
        console.log("OAuthGoogle:", error);
        throw new Error("Error OAuthGoogle: ", error);
    }
};


/**
 * Save User with Google
 * @param {int} idtoken
 */
const SaveUserGoogle = async(idtoken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idtoken,
            audience: process.env.GOOGLE_ID
        });

        const user = ticket.getPayload();

        const socialId = user.sub;
        const name = user.name;
        const email = user.email;
        const locale = user.locale;
        const picture = user.picture;

        const saveUser = await User.findOne({
            where: {
                socialId,
                social: 'google'
            }
        })
        if (saveUser) {
            return await User.update({
                locale,
                picture,
            }, {
                where: {
                    socialId,
                    social: 'google'
                }
            })
        } else {
            return await User.create({
                socialId,
                name,
                email,
                locale,
                picture,
                social: 'google'
            })
        }

    } catch (error) {
        console.log("Error SaveUserGoogle: ", error)
        return error;
    }
}



module.exports = {
    controllerAuthGoogle
}