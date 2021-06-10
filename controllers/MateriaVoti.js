const { MateriaVoti } = require('../models');

const db = require('../services/db.service');

/**
 * MateriaVoti: inserimento di un nuovo voto di una materia nel db tramite materiaUserId
 * @param {bigint} materiaUserId
 * @param {enum} tipologia
 * @param {float} voto
 * @param {date} data
 * @param {integer} notifica
 * @returns {object}
 */
async function saveMateriaVoti(materiaUserId, { tipologia = 'scritto', voto = null, data = null, notifica = null }) {
    try {
        return await MateriaVoti.create({
            materiaUserId: materiaUserId,
            tipologia,
            voto,
            data,
            notifica
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
 * @returns [ 0 | 1]
 */
async function updateMateriaVoti(materiaVotiId, { tipologia, voto, data, notifica, }) {
    try {
        return await MateriaVoti.update({
            tipologia,
            voto,
            data,
            notifica
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




module.exports = {
    saveMateriaVoti,
    updateMateriaVoti,
    deleteMateriaVoti,
    getMateriaVoti,
    getAllMateriaVoti,
    getAllUserMateriaVoti
}