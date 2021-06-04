const Materia = require('../models/').Materia;
const MateriaUsers = require('../models/').MateriaUsers;


/**
 * Associo l'Id (UserAuths) ad un nuovo User
 * @param {bigint} id
 * @param {string} name 
 * @returns object
 */
async function SaveUserLogin(id, name) {
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
 * ADD - aggiungo una nuova Materia nel db
 * @param {string} istituto
 * @param {string} localita
 * @returns {object}
 */
async function saveMateria(nome) {
    try {
        return await Materia.create({ nome });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono tutti gli Istituto presenti nel db
 * @returns [object]
 */
async function getMateria() {
    try {
        return await Materia.findAll();
    } catch (error) {
        throw error;
    }
}



module.exports = {
    saveMateria,
    getMateria,
    saveIstituto,
    getIstituto
}