const User = require('../models/').User

/**
 * Login with Facebook
 * 
 * @param id
 * @param social
 * @param name
 */
const loginFacebook = async(id, social, name) => {
    try {
        const user = await User.findOne({
            where: {
                name: name,
                social: social
            }
        })
        if (user) {
            return await User.update({
                socialId: id,
            }, {
                where: {
                    name: name,
                    social: social
                }
            })
        } else {
            return await User.create({
                socialId: id,
                name: name,
                social: social
            })
        }


    } catch (error) {
        console.log("Error repository: ", error)
        return error;
    }
}


module.exports = {
    loginFacebook
}