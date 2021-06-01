const UserAuth = require('../models').UserAuth

const axios = require('axios');
/**
 * 
 */
const controllerAuthTwitch = async(req, res) => {
    try {
        try {
            const twitch_id = process.env.TWITCH_ID;
            const twitch_secret = process.env.TWITCH_SECRET;
            const twitch_callback = process.env.TWITCH_CALLBACK;
            const request = 'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=' + twitch_id + '&redirect_uri=' + twitch_callback + '&scope=viewing_activity_read';

            res.redirect(request);

        } catch (e) {
            console.log("Error: ", e);
        }

    } catch (error) {
        console.log("Twitch auth:", error);
        throw new Error("Twitch auth ", error);
    }
};



module.exports = { controllerAuthTwitch }