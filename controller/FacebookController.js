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
        return await SaveUserFacebook(user.data);
    } catch (error) {
        console.log("Facebook auth:", error);
        throw new Error("Facebook auth ", error);
    }
};


/**
 * Save User with Twitter Facebook
 * 
 * @param {object} users
 */
const SaveUserFacebook = async(users) => {
    try {

        const social_id = users.social_id;
        const social = users.social;
        const name = users.name;
        const user = await UserAuth.findOne({
            where: {
                name,
                social
            }
        })
        if (user) {
            return await UserAuth.update({
                social_id,
            }, {
                where: {
                    name,
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
        console.log("Error SaveUserFacebook: ", error)
        return error;
    }
}


module.exports = {
    controllerAuthFacebook
}