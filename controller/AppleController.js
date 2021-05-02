const User = require('../models').User

/**
 * Ottengo le informazioni dell'User da Facebook, e salvo il dato
 * @param {object} user 
 */
const controllerAuthApple = async(req, res) => {
    try {
        const { token, email, apple_id } = req.body;
        fakeDB.getUser(apple_id, (user, err) => {
            if (err) {
                res.status(401).send(err.message);
            } else if (!isEmpty(user)) {
                if (email && email !== user.email) {
                    fakeDB.updateUser(req.body);
                    user.email = req.body.email;
                }
                res.status(200).send(user);
            }
        })


        return await SaveUserFacebook(user);
    } catch (error) {
        console.log("Apple auth:", error);
        throw new Error("Apple auth ", error);
    }
};



module.exports = { controllerAuthApple }