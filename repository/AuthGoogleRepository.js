const User = require('../models').User
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID)

/**
 * Login with Facebook
 * 
 * @param id
 * @param name
 */
const loginGoogle = async(idtoken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idtoken,
            audience: process.env.GOOGLE_ID
        });

        const { sub, name, email, locale, picture } = ticket.getPayload();

        // const user = await User.upsert({
        //     where: {
        //         email: email,
        //         name: name,
        //         social: 'google'
        //     },
        //     update: {
        //         socialId: sub,
        //         locale: locale,
        //         picture: picture,
        //     },
        //     create: {
        //         socialId: sub,
        //         name,
        //         email,
        //         locale,
        //         picture,
        //         social: 'google'
        //     },
        // });
        const user = await User.findOne({
            where: {
                email: email,
                name: name,
                social: 'google'
            }
        })
        if (user) {
            return await User.update({
                socialId: sub,
                locale,
                picture,
            }, {
                where: {
                    name,
                    email,
                    social: 'google'
                }
            })
        } else {
            return await User.create({
                socialId: sub,
                name,
                email,
                locale,
                picture,
                social: 'google'
            })
        }

    } catch (error) {
        console.log("Error repository: ", error)
        return error;
    }
}

module.exports = {
    loginGoogle

}