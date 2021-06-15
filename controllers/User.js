const { User, Istituto, Istruzione } = require('../models');

/**
 * Ottengo info dello User tramite ID
 * @param {bigint} id 
 * @returns object
 */
async function infoUser(id) {
    try {
        return await User.findByPk(id);
    } catch (error) {
        throw error;
    }
}


/**
 * Associo l'Id (UserAuths) ad un nuovo User
 * @param {bigint} id
 * @param {string} name 
 * @returns object
 */
async function saveUserLogin(id, name) {
    try {

        return await User.create({
            userAuthId: id,
            nickname: name
        });
    } catch (error) {
        throw error;
    }
}


/**
 * Associo l'Id (UserAuths) ad un nuovo User (children) tramite id parent,
 * @param {bigint} idParent
 * @param {string} nickname 
 * @param {bigint} istitutoId
 * @param {int} anno ?
 * @param {string} sezione ?
 * @returns object
 */
async function saveUserChildren(userAuthId, { nickname, istitutoId, anno = null, sezione = null }) {
    try {

        return await User.create({
            userAuthId,
            nickname,
            istitutoId,
            anno,
            sezione
        });
    } catch (error) {
        throw error;
    }
}

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

/**
 * ADD - aggiungo un nuovo Istituto nel db e lo associa all'utente
 * @param {string} istituto
 * @param {string} citta
 * @returns {object}
 */
async function saveIstituto(istruzioneId, { istituto, citta }) {
    try {
        return await Istituto.create({ istruzioneId, istituto, citta });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono tutti gli Istituto presenti nel db
 * @returns [object]
 */
async function getIstituto() {
    try {
        return await Istituto.findAll();
    } catch (error) {
        throw error;
    }
}


// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

/**
 * ADD - aggiungo un nuovo Istruzione nel db
 * @param {string} istituto
 * @param {string} citta
 * @returns {object}
 */
async function saveIstruzione({ istruzione }) {
    try {
        return await Istruzione.create({ istruzione });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono tutti i tipi di Istruzione presenti nel db
 * @returns [object]
 */
async function getIstruzione() {
    try {
        return await Istruzione.findAll();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    infoUser,
    saveUserLogin,
    saveUserChildren,

    saveIstituto,
    getIstituto,

    getIstruzione,
    saveIstruzione
}