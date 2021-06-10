const { OrarioScolastico } = require('../models');

const db = require('../services/db.service');

/**
 * CREATE - OrarioScolastico: inserimento di un nuovo orario di una materia nel db, tramite materiaUserId
 * @param {bigint} materiaUserId
 * @param {string} aula
 * @param {enum} giornoSettimana
 * @param {date} ora_inizio
 * @param {date} ora_fine
 * @returns {object}
 */
async function saveOrario(materiaUserId, { aula = null, giornoSettimana = null, ora_inizio = null, ora_fine = null }) {
    try {
        return await OrarioScolastico.create({
            materiaUserId,
            aula,
            giornoSettimana,
            ora_inizio,
            ora_fine
        });
    } catch (error) {
        throw error;
    }
}

/**
 * UDPDATE - OrarioScolastico: modifica di un orario di una materia, tramite orarioId
 * @param {bigint} orarioId
 * @param {string} aula
 * @param {enum} giornoSettimana
 * @param {date} ora_inizio
 * @param {date} ora_fine
 * @returns [ 0 | 1]
 */
async function updateOrario(orarioId, { aula, giornoSettimana, ora_inizio, ora_fine }) {
    try {
        return await OrarioScolastico.update({
            aula,
            giornoSettimana,
            ora_inizio,
            ora_fine
        }, {
            where: {
                id: orarioId
            }
        });
    } catch (error) {
        throw error;
    }
}


/**
 * DELETE - OrarioScolastico: elimino l'orario della materia, tramite orarioId
 * @param {bigint} orarioId 
 * @returns [1 success | 0 fail ]
 */
async function deleteOrario(orarioId) {
    try {
        return await OrarioScolastico.destroy({
            where: {
                id: orarioId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - OrarioScolastico: viene selezionato un orario di una materia tramite orarioId
 * @param {bigint} orarioId 
 * @returns {object}
 */
async function getOrario(orarioId) {
    try {
        return await OrarioScolastico.findByPk(orarioId);
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - OrarioScolastico: vengono selezionati tutti gli orari di una materia, tramite materiaUserId
 * @param {bigint} materiaUserId 
 * @returns [{object}]
 */
async function getMateriaOrario(materiaUserId) {
    try {
        return await OrarioScolastico.findAll({
            where: {
                materiaUserId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - OrarioScolastico: vengono selezionati tutti gli orario di tutte le materia dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns {object}
 */
async function getUserOrario(userId) {
    try {
        return await db.sequelize.query(
            `SELECT "OrarioScolastico".* 
                FROM "MateriaUser", "OrarioScolastico"
                WHERE "MateriaUser"."id" = "OrarioScolastico"."materiaUserId"
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
    saveOrario,
    updateOrario,
    deleteOrario,
    getOrario,
    getMateriaOrario,
    getUserOrario
}