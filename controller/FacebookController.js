const User = require('../models').User

/**
 * Ottengo le informazioni dell'User da Facebook, e salvo il dato
 * @param {object} user 
 */
const controllerAuthFacebook = async(user) => {
    try {

        if (!user) {
            throw new Error('Facebook info not found!');
        }
        console.log("user: ", user);
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

        const socialId = users.socialID;
        const social = users.social;
        const name = users.name;
        const user = await User.findOne({
            where: {
                name,
                social
            }
        })
        if (user) {
            return await User.update({
                socialId,
            }, {
                where: {
                    name,
                    social
                }
            })
        } else {
            return await User.create({
                socialId,
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