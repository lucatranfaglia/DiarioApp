const Istituto = require('../models').Istituto;
const User = require('../models').User;

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
        console.log("test : ", id, name);
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
async function saveUserChildren({ idParent, nickname, istitutoId, anno = null, sezione = null }) {
    try {

        return await User.create({
            userAuthId: idParent,
            nickname,
            istitutoId,
            anno,
            sezione
        });
    } catch (error) {
        throw error;
    }
}


/**
 * ADD - aggiungo un nuovo Istituto nel db e lo associa all'utente
 * @param {string} istituto
 * @param {string} localita
 * @returns {object}
 */
async function saveIstituto({ istituto, localita }) {
    try {
        return await Istituto.create({ istituto, localita });
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



module.exports = {
    infoUser,
    saveUserLogin,
    saveUserChildren,
    saveIstituto,
    getIstituto
}