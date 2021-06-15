const { Materia, MateriaUser } = require('../models');

const db = require('../services/db.service');

/**
 * MateriaUser: inserimento di una nuova MateriaUser nel db tramite UserId, materiaId e professoreId
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
async function saveMateriaUser(userId, istitutoId = null, { materiaId, professoreId = null, type = 'aula', giustificazioni = null, crediti = null }) {
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


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

/**
 * SELECT - seleziono tutte le Materia presenti nel db
 * @returns [object]
 */
async function getMaterie() {
    try {
        return await Materia.findAll();
    } catch (error) {
        throw error;
    }
}



/**
 * SELECT - seleziono una Materia dell'utente
 * @returns [object]
 */
async function getMateriaUser(userId, materiaId) {
    try {
        return await MateriaUser.findAll({
            where: {
                userId,
                materiaId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono una Materia dell'utente
 * @returns [object]
 */
async function getMateriaUserDetails(userId, materiaId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                "User"."nickname" as "nome",
                "Istituto"."istituto" as "istituto",
                "Materia"."nome" as "materia",
                "Professore"."nome" as "professore",
                "MateriaUser".*
                FROM "MateriaUser", "User", "Istituto", "Materia", "Professore"
                WHERE "MateriaUser"."userId" =:userId 
                AND "MateriaUser"."materiaId" =:materiaId 
                AND "User"."id" = "MateriaUser"."userId"
                AND "Istituto"."id" = "MateriaUser"."istitutoId"
                AND "Materia"."id" = "MateriaUser"."materiaId"
                AND "Professore"."id" = "MateriaUser"."professoreId"
            `, {
                replacements: { userId, materiaId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}


/**
 * SELECT - seleziono una Materia dell'utente
 * @returns [object]
 */
async function getMaterieUserDetails(userId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                "User"."nickname" as "nome",
                "Istituto"."istituto" as "istituto",
                "Materia"."nome" as "materia",
                "Professore"."nome" as "professore",
                "MateriaUser".*
                FROM "MateriaUser", "User", "Istituto", "Materia", "Professore"
                WHERE "MateriaUser"."userId" =:userId 
                AND "User"."id" = "MateriaUser"."userId"
                AND "Istituto"."id" = "MateriaUser"."istitutoId"
                AND "Materia"."id" = "MateriaUser"."materiaId"
                AND "Professore"."id" = "MateriaUser"."professoreId"
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
    saveMateriaUser,
    saveMateria,

    getMaterie,
    getMateriaUser,
    getMaterieUserDetails,
    getMateriaUserDetails
}