const { Pagella } = require('../models');

const db = require('../services/db.service');

/**
 * Pagella: inserimento di un nuovo voto di una materia nel db tramite materiaUserId
 * @param {bigint} userId 
 * @param {string} nome 
 * @param {array} infoVoti 
 * @returns {object}
 */
async function savePagella(userId, infoVoti, { nome = null }) {
    try {
        return await Pagella.create({
            userId,
            nome,
            infoVoti
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Pagella: Modifica le info o il nome della pagella tramite pagellaId
 * @param {bigint} pagellaId
 * @param {string} nome
 * @param {array} infoVoti
 * @returns [ 0 | 1]
 */
async function updatePagella(pagellaId, { nome, infoVoti = [] }) {
    try {
        return await Pagella.update({
            nome,
            infoVoti
        }, {
            where: {
                id: pagellaId
            }
        });
    } catch (error) {
        throw error;
    }
}


/**
 * DELETE - elimino la pagella tramite pagellaiId
 * @param {bigint} pagellaiId 
 * @returns [1 success | 0 fail ]
 */
async function deletePagella(pagellaiId) {
    try {
        return await MateriaVoti.destroy({
            where: {
                id: pagellaiId
            }
        });
    } catch (error) {
        throw error;
    }
}


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

/**
 * SELECT - viene selezionato una pagella, tramite pagellaId
 * @param {bigint} pagellaId 
 * @returns {object}
 */
async function getPagella(pagellaId) {
    try {
        return await Pagella.findByPk(pagellaId);
    } catch (error) {
        throw error;
    }
}


/**
 * SELECT - vengono selezionati tutte le pagelle dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns [{object}]
 */
async function getPagelle(userId) {
    try {
        return await Pagella.findAll({
            where: {
                userId
            }
        });

    } catch (error) {
        throw error;
    }
}


// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------



module.exports = {
    // --------------------------------
    savePagella,
    updatePagella,
    deletePagella,
    getPagella,
    getPagelle,
    // --------------------------------    

}