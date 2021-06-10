const { Materia } = require('../models');
const { MateriaUser } = require('../models');


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
async function saveMateriaUser(userId, istitutoId = null, materiaId, professoreId = null, { type = 'aula', giustificazioni = null, crediti = null }) {
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
 * @param {nome} nome
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
    saveMateriaUser,
    saveMateria,
    getMateria,
}