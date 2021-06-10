const { Submateria } = require('../models');

const db = require('../services/db.service');

/**
 * Submateria: inserimento di una nuova Submateria di una materia nel db, tramite materiaUserId
 * @param {bigint} materiaUserIdParent
 * @param {bigint} materiaUserIdChild
 * @returns {object}
 */
async function saveSubmateriaParent(materiaUserIdParent, { materiaUserIdChild = null }) {
    try {
        return await Submateria.create({
            materiaUserIdParent,
            materiaUserIdChild
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Submateria: inserimento di una nuova Submateria di una materia nel db, tramite materiaUserId
 * @param {bigint} materiaUserIdChild
 * @param {bigint} materiaUserIdParent
 * @returns {object}
 */
async function saveSubmateriaChild(materiaUserIdChild, { materiaUserIdParent = null }) {
    try {
        return await Submateria.create({
            materiaUserIdChild,
            materiaUserIdParent
        });
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

/**
 * Submateria: Modifica di una submateria di una materia, tramite materiaUserIdParent e materiaUserIdChild (inserito da utente)
 * @param {bigint} materiaUserIdParent
 * @param {bigint} materiaUserIdChild
 * @returns [ 0 | 1]
 */
async function updateSubmateriaParent(materiaUserIdParent, { materiaUserIdChild = null }) {
    try {
        return await Submateria.update({
            materiaUserIdChild
        }, {
            where: {
                id: materiaUserIdParent
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Submateria: Modifica di una submateria di una materia, tramite  materiaUserIdChild e materiaUserIdParent(inserito da utente)
 * @param {bigint} materiaUserIdChild
 * @param {bigint} materiaUserIdParent
 * @returns [ 0 | 1]
 */
async function updateSubmateriaChild(materiaUserIdChild, { materiaUserIdParent = null }) {
    try {
        return await Submateria.update({
            materiaUserIdParent
        }, {
            where: {
                id: materiaUserIdChild
            }
        });
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

/**
 * DELETE - elimino il Submateria della materia, tramite SubmateriaId
 * @param {bigint} SubmateriaId 
 * @returns [1 success | 0 fail ]
 */
async function deleteSubmateria(SubmateriaId) {
    try {
        return await Submateria.destroy({
            where: {
                id: SubmateriaId
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
    saveSubmateriaParent,
    saveSubmateriaChild,

    updateSubmateriaParent,
    updateSubmateriaChild,
    deleteSubmateria,

}