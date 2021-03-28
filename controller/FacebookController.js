const User = require('../model').User

/**
 * Ottengo le informazioni dell'User da Facebook, e salvo il dato
 * @param {object} user 
 */
const controllerAuthFacebook = async(user) => {
    try {

        if (!user) {
            throw new Error('Facebook info not found!');
        }
        return await SaveUserFacebook(user);
    } catch (error) {
        console.log("Facebook auth:", error);
        throw new Error("Facebook auth ", error);
    }
};


/**
 * Save User with Twitter Facebook
 * 
 * @param {object} user
 */
const SaveUserFacebook = async(user) => {
    try {
        const socialId = user.id;
        const social = user.social;
        const name = user.name;
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