const { MateriaVoti } = require('../models');

const db = require('../services/db.service');

/**
 * MateriaVoti: inserimento di un nuovo voto di una materia nel db tramite materiaUserId
 * @param {bigint} materiaUserId
 * @param {enum} tipologia
 * @param {float} voto
 * @param {date} data
 * @param {integer} notifica
 * @param {enum} status
 * @returns {object}
 */
async function saveMateriaVoti(materiaUserId, { tipologia = 'scritto', voto = null, data = null, notifica = null, status = 'active' }) {
    try {
        return await MateriaVoti.create({
            materiaUserId: materiaUserId,
            tipologia,
            voto,
            data,
            notifica,
            status
        });
    } catch (error) {
        throw error;
    }
}

/**
 * MateriaVoti: Modifica di un voto di una materia tramite materiaVotiId
 * @param {bigint} materiaVotiId
 * @param {enum} tipologia
 * @param {float} voto
 * @param {date} data
 * @param {integer} notifica
 * @param {enum} status
 * @returns [ 0 | 1]
 */
async function updateMateriaVoti(materiaVotiId, { tipologia, voto, data, notifica, status }) {
    try {
        return await MateriaVoti.update({
            tipologia,
            voto,
            data,
            notifica,
            status
        }, {
            where: {
                id: materiaVotiId
            }
        });
    } catch (error) {
        throw error;
    }
}


/**
 * DELETE - elimino il voto della materia tramite materiaVotiId
 * @param {bigint} materiaVotiId 
 * @returns [1 success | 0 fail ]
 */
async function deleteMateriaVoti(materiaVotiId) {
    try {
        return await MateriaVoti.destroy({
            where: {
                id: materiaVotiId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - viene selezionato un voto di una materia tramite materiaVotiId
 * @param {bigint} materiaVotiId 
 * @returns {object}
 */
async function getMateriaVoti(materiaVotiId) {
    try {
        return await MateriaVoti.findByPk(materiaVotiId);
    } catch (error) {
        throw error;
    }
}

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * SELECT - vengono selezionati tutti i voti di una materia, tramite materiaUserId
 * @param {bigint} materiaUserId 
 * @returns [{object}]
 */
async function getAllMateriaVoti(materiaUserId) {
    try {
        return await MateriaVoti.findAll({
            where: {
                materiaUserId: materiaUserId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - vengono selezionati tutti i voti di una materia, tramite materiaUserId
 * @param {bigint} materiaUserId 
 * @returns [{object}]
 */
async function getAllMateriaVotiDetails(materiaUserId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                "User"."nickname",
                "MateriaVoti"."tipologia",
                "MateriaVoti"."voto",
                "MateriaVoti"."data",
                "MateriaVoti"."notifica",

                "MateriaUser"."type",
                "MateriaUser"."giustificazioni",
                "MateriaUser"."crediti",

                "Istituto"."istituto",
                "Istituto"."citta",
                "Materia"."nome" as nome_materia,
                "Professore"."nome" as nome_professore,
                "Professore"."cognome" as cognome_professore
                FROM 
                    "MateriaUser", 
                    "MateriaVoti", 
                    "User",
                    "Istituto",
                    "Materia",
                    "Professore"
                WHERE "MateriaVoti"."materiaUserId" = :materiaUserId
                    AND "MateriaVoti"."materiaUserId" = "MateriaUser"."id"
                    AND "MateriaUser"."userId" = "User"."id"
                    AND "MateriaUser"."istitutoId" = "Istituto"."id"
                    AND "MateriaUser"."materiaId" = "Materia"."id"
                    AND "MateriaUser"."professoreId" = "Professore"."id"
            `, {
                replacements: { materiaUserId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );

    } catch (error) {
        throw error;
    }
}

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * SELECT - vengono selezionati tutti i voti di tutte le materia dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns {object}
 */
async function getAllUserMateriaVoti(userId) {
    try {
        return await db.sequelize.query(
            `SELECT "MateriaVoti".* 
                FROM "MateriaUser", "MateriaVoti"
                WHERE "MateriaUser"."id" = "MateriaVoti"."materiaUserId"
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


/**
 * SELECT - vengono selezionati tutti i voti di tutte le materia dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns {object}
 */
async function getAllUserMateriaVotiDetails(userId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                "User"."nickname",
                "MateriaVoti"."tipologia",
                "MateriaVoti"."voto",
                "MateriaVoti"."data",
                "MateriaVoti"."notifica",

                "MateriaUser"."type",
                "MateriaUser"."giustificazioni",
                "MateriaUser"."crediti",

                "Istituto"."istituto",
                "Istituto"."citta",
                "Materia"."nome" as nome_materia,
                "Professore"."nome" as nome_professore,
                "Professore"."cognome" as cognome_professore
                FROM 
                    "MateriaUser", 
                    "MateriaVoti", 
                    "User",
                    "Istituto",
                    "Materia",
                    "Professore"
                WHERE 
                    "MateriaUser"."userId" =:userId 
                    AND "MateriaVoti"."materiaUserId" = "MateriaUser"."id"
                    AND "MateriaUser"."userId" = "User"."id"
                    AND "MateriaUser"."istitutoId" = "Istituto"."id"
                    AND "MateriaUser"."materiaId" = "Materia"."id"
                    AND "MateriaUser"."professoreId" = "Professore"."id"
            `, {
                replacements: { userId: userId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}


// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
/**
 * NUOVA PAGELLA - vengono selezionati tutti i voti di tutte le materia dell'utente e salvati in un array e inseriti in Pagella
 * @param {bigint} userId 
 * @returns {object}
 */
async function getMateriaVotiByUserId(userId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                "Materia"."nome",
                "MateriaUser"."userId",
                "MateriaUser"."materiaId",
                "MateriaUser"."crediti",
                "MateriaVoti".*
            FROM 
                "Materia",
                "MateriaUser", 
                "MateriaVoti"
            WHERE 
                "MateriaUser"."userId" =:userId 
                AND "MateriaVoti"."materiaUserId" = "MateriaUser"."id"
                AND "MateriaUser"."materiaId" = "Materia"."id"
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
    // --------------------------------
    saveMateriaVoti,
    updateMateriaVoti,
    deleteMateriaVoti,
    // --------------------------------    
    getMateriaVoti,
    getAllMateriaVoti,
    getAllMateriaVotiDetails,
    // --------------------------------
    getAllUserMateriaVoti,
    getAllUserMateriaVotiDetails,

    // --------------------------------
    getMateriaVotiByUserId
}