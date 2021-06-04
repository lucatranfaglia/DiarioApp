const Professore = require('../models/').Professore;
const ProfessoreUser = require('../models/').ProfessoreUser;




/**
 * ADD - aggiungo un nuovo Professore nel db
 * @param {bigint} istitutoId
 * @param {bigint} materiaId
 * @param {bigint} professoreId
 * @returns {object}
 */
async function saveProfessoreUser(istitutoId, materiaId, professoreId) {
    try {
        return await ProfessoreUser.create({
            istitutoId,
            materiaId,
            professoreId
        });
    } catch (error) {
        throw error;
    }
}


/**
 * ADD - aggiungo un nuovo Professore nel db
 * @param {string} nome
 * @param {string} cognome
 * @param {string} email
 * @param {integer} telefono
 * @returns {object}
 */
async function saveProfessore({ nome = null, cognome = null, email = null, telefono = null }) {
    try {
        return await Professore.create({
            nome,
            cognome,
            email,
            telefono
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono tutti i prof. presenti nel db
 * @returns [object]
 */
async function getProfessori() {
    try {
        return await Professore.findAll();
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getProfessori,
    saveProfessore,
    saveProfessoreUser
}