const UserAuth = require('../models').UserAuth

/**
 * Ottengo le informazioni dell'User da Facebook, e salvo il dato
 * @param {object} user 
 */
const controllerAuthFacebook = async(user) => {
    try {

        if (!user) {
            throw new Error('Facebook info not found!');
        }
        console.log("Data FB: ", user)
        return await saveUserFacebook(user.data);
    } catch (error) {
        console.log("Facebook auth:", error);
        throw new Error("Facebook auth ", error);
    }
};


/**
 * Save User with Facebook
 * @param {string} social
 * @param {string} social_id
 * @param {string} name
 */
const saveUserFacebook = async({ social_id, name, social }) => {
    try {


        const user = await UserAuth.findOne({
            where: {
                social_id,
                social
            }
        })
        if (user) {
            return await UserAuth.update({
                name
            }, {
                where: {
                    social_id,
                    social
                }
            })
        } else {
            return await UserAuth.create({
                social_id,
                name,
                social
            })
        }
    } catch (error) {
        console.log("Error saveUserFacebook: ", error)
        throw error;
    }
}


module.exports = {
    controllerAuthFacebook,
    saveUserFacebook
}