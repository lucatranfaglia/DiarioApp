const Materia = require('../models/').Materia;
const MateriaUser = require('../models/').MateriaUser;


/**
 * MateriaUser: inserimento di una nuova MateriaUser nel db tramite UserId
 * @param {bigint} userId
 * @param {bigint} istitutoId
 * @param {bigint} materiaId
 * @param {bigint} professoreId
 * @param {ENUM} type
 * @param {integer} giustificazioni 
 * @param {integer} crediti
 * @returns {object}
 */
async function SaveMateriaUser(userId, istitutoId = null, { materiaId, professoreId = null, type = 'aula', giustificazioni = null, crediti = null }) {
    try {
        return await MateriaUser.create({
            userId,
            istitutoId,
            materiaId,
            professoreId,
            type,
            giustificazioni,
            crediti
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
async function saveMateria({ nome }) {
    try {
        return await Materia.create({ nome });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono tutte le Materia presenti nel db
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
    SaveMateriaUser,
    saveMateria,
    getMateria,
}