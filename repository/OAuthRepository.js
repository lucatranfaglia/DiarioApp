/**
 * Login with Facebook
 * 
 * @param accessToken
 * @param userID
 */
const loginFacebook = async(accessToken, userID) => {
    try {

        const results = await checkLoginFacebook(accessToken, userID)

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
const checkLoginFacebook = async(accessToken, userID) => {
    try {

    } catch (e) {

    }

}



module.exports = {
    loginFacebook
}