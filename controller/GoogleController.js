const UserAuth = require('../models').UserAuth

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
 * Save UserAuth with Google
 * @param {int} idtoken
 */
const SaveUserGoogle = async(idtoken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idtoken,
            audience: process.env.GOOGLE_ID
        });

        const user = ticket.getPayload();

        const social_id = user.sub;
        const name = user.name;
        const email = user.email;
        const locale = user.locale;
        const picture = user.picture;

        const saveUser = await UserAuth.findOne({
            where: {
                social_id,
                social: 'google'
            }
        })
        if (saveUser) {
            return await UserAuth.update({
                locale,
                picture,
            }, {
                where: {
                    social_id,
                    social: 'google'
                }
            })
        } else {
            return await UserAuth.create({
                social_id,
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