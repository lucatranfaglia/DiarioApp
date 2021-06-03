const Istituto = require('../models/').Istituto;

// ADD - aggiungo un nuovo Istituto nel db e lo associa all'utente
async function saveIstituto({ istituto, localita }) {
    try {
        return await Istituto.create({ istituto, localita });
    } catch (error) {
        throw error;
    }
}

// SELECT - seleziono tutti gli Istituto presenti nel db
async function getIstituto() {
    try {
        return await Istituto.findAll();
    } catch (error) {
        throw error;
    }
}

// associo l'Id (UserAuths) ad un nuovo User
async function newUser() {
    try {
        return await Istituto.create({ istituto, localita });
    } catch (error) {
        throw error;
    }
}


module.exports = {
    saveIstituto,
    getIstituto
}