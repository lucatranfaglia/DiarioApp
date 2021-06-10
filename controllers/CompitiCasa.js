const { CompitiCasa } = require('../models');

const db = require('../services/db.service');

/**
 * CompitoCasa: inserimento di un nuovo compito di una materia nel db, tramite materiaUserId
 * @param {bigint} materiaUserId
 * @param {date} data
 * @param {integer} priorita
 * @param {integer} stato
 * @param {string} testo
 * @param {integer} notifica
 * @returns {object}
 */
async function saveCompito(materiaUserId, { data = null, priorita = null, stato = 'nuovo', testo = null, notifica = null }) {
    try {
        return await CompitiCasa.create({
            materiaUserId,
            data,
            priorita,
            stato,
            testo,
            notifica
        });
    } catch (error) {
        throw error;
    }
}

/**
 * CompitiCasa: Modifica di un compito di una materia, tramite compitoId
 * @param {bigint} compitoId
 * @param {date} data
 * @param {integer} priorita
 * @param {integer} stato
 * @param {string} testo
 * @param {integer} notifica
 * @returns [ 0 | 1]
 */
async function updateCompito(compitoId, { data = null, priorita = null, stato = 'dacompletare', testo = null, notifica = null }) {
    try {
        return await CompitiCasa.update({
            data,
            priorita,
            stato,
            testo,
            notifica
        }, {
            where: {
                id: compitoId
            }
        });
    } catch (error) {
        throw error;
    }
}


/**
 * DELETE - elimino il compito della materia, tramite compitoId
 * @param {bigint} compitoId 
 * @returns [1 success | 0 fail ]
 */
async function deleteCompito(compitoId) {
    try {
        return await CompitiCasa.destroy({
            where: {
                id: compitoId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - viene selezionato un compito di una materia tramite compitoId
 * @param {bigint} compitoId 
 * @returns {object}
 */
async function getCompito(compitoId) {
    try {
        return await CompitiCasa.findByPk(compitoId);
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - vengono selezionati tutti i compiti di una materia, tramite materiaUserId
 * @param {bigint} materiaUserId 
 * @returns [{object}]
 */
async function getMateriaCompiti(materiaUserId) {
    try {
        return await CompitiCasa.findAll({
            where: {
                materiaUserId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - vengono selezionati tutti i compiti di una materia di una specifica data, tramite data
 * @param {bigint} materiaUserId 
 * @param {date} data 
 * @returns [{object}]
 */
async function getMaterieCompitiData(materiaUserId, { data }) {
    try {
        return await CompitiCasa.findAll({
            where: {
                materiaUserId,
                data
            }
        });
    } catch (error) {
        throw error;
    }
}


/**
 * SELECT - vengono selezionati tutti i compiti di una specifica data, tramite data
 * @param {date} data 
 * @returns [{object}]
 */
async function getCompitiData({ data }) {
    try {
        return await CompitiCasa.findAll({
            where: {
                data
            }
        });
    } catch (error) {
        throw error;
    }
}


// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

/**
 * SELECT - vengono selezionati tutti i compiti di tutte le materia dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns {object}
 */
async function getUserCompiti(userId) {
    try {
        return await db.sequelize.query(
            `SELECT "CompitiCasa".* 
                FROM "MateriaUser", "CompitiCasa"
                WHERE "MateriaUser"."id" = "CompitiCasa"."materiaUserId"
                AND "MateriaUser"."userId" =:userId 
            `, {
                replacements: { userId: userId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}




module.exports = {
    saveCompito,
    updateCompito,
    deleteCompito,
    getCompito,
    getUserCompiti,
    getMateriaCompiti,
    getMaterieCompitiData,
    getCompitiData

}