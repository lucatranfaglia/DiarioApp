const { User } = require('../models/user');

/**
 * Login with Facebook
 * 
 * @param id
 * @param name
 */
const loginFacebook = async(id, name) => {
    try {
        const results = await checkLoginFacebook(id, name, social = 'facebook');

        if ((results && results != undefined) && (results.affectedRows != '' || results.affectedRows != undefined)) {
            return await results.affectedRows;
        } else {
            throw new Error('Query not valid.'); //pass to error handler
        }
    } catch (error) {
        console.log("Error repository: ", error)
        return error;
    }
}


//
const checkLoginFacebook = async(id, name, social) => {
    try {
        return await User.create({
            socialId: id,
            name: name,
            social: social
        })
    } catch (e) {
        return e;
    }

}



module.exports = {
    loginFacebook
}