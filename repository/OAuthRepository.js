const User = require('../models/').User

/**
 * Login with Facebook
 * 
 * @param id
 * @param name
 */
const loginFacebook = async(id, social, name) => {
    try {

        const results = await checkLoginFacebook(id, social, name);

        if (results) {
            return await results;
        } else {
            throw new Error('Query not valid.'); //pass to error handler
        }
    } catch (error) {
        console.log("Error repository: ", error)
        return error;
    }
}


//
const checkLoginFacebook = async(id, social, name) => {
    try {
        console.log("Repository facebook2", User);
        const query = await User.create({
            socialID: id,
            name: name,
            social: social
        })
        console.log(query.toJSON());
        return query;
    } catch (e) {
        console.log("Repository facebook error", e.message);
        throw new Error(e.message);
    }
}


// ritorna tutte le liste con i relativi utenti
async function getListUser() {
    return await User.findAll();
}


module.exports = {
    loginFacebook
}