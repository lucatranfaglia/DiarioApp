const { Assenza } = require('../models');

const db = require('../services/db.service');

/**
 * Assenza: inserimento di un nuovo Avvido nel db tramite UserId
 * @param {bigint} userId
 * @param {date} data
 * @returns {object}
 */
async function saveAssenza(userId, { data = null }) {
    try {
        return await Assenza.create({
            userId,
            data
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Assenza: Modifica di un Avvido nel db tramite assenzaId
 * @param {bigint} assenzaId 
 * @param {date} data
 * @returns [ 0 | 1]
 */
async function updateAssenza(assenzaId, { data }) {
    try {
        return await Assenza.update({
            data,
        }, {
            where: {
                id: assenzaId
            }
        });
    } catch (error) {
        throw error;
    }
}


/**
 * DELETE - elimino l'Assenza nel db tramite assenzaId
 * @param {bigint} assenzaId 
 * @returns [1 success | 0 fail ]
 */
async function deleteAssenza(assenzaId) {
    try {
        return await Assenza.destroy({
            where: {
                id: assenzaId
            }
        });
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

/**
 * SELECT - viene selezionato un Assenza tramite assenzaId
 * @param {bigint} assenzaId 
 * @returns [{object}]
 */
async function getAssenza(assenzaId) {
    try {
        return await Assenza.findByPk(assenzaId);
    } catch (error) {
        throw error;
    }
}


/**
 * SELECT - viene selezionato un Assenza tramite assenzaId
 * @param {bigint} userId 
 * @returns [{object}]
 */
async function getAssenzaDetails(assenzaId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                    "User"."nickname",
                    "Assenza".*                    
                FROM 
                    "Assenza",
                    "User"
                WHERE 
                    "Assenza"."id"=:assenzaId
                    AND "User"."id"="Assenza"."userId"
                `, {
                replacements: { assenzaId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

/**
 * SELECT - vengono selezionati tutti gli Assenze dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns {object}
 */
async function getAssenze(userId) {
    try {
        return await Assenza.findAll({
            where: {
                userId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - vengono selezionati tutti gli Assenze dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns {object}
 */
async function getAssenzeDetails(userId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                    "User"."nickname",
                    "Assenza".*                    
                FROM 
                    "Assenza",
                    "User"
                WHERE 
                    "Assenza"."userId"=:userId
                    AND "User"."id"="Assenza"."userId"
                `, {
                replacements: { userId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}



module.exports = {
    saveAssenza,
    updateAssenza,
    deleteAssenza,

    getAssenza,
    getAssenzaDetails,

    getAssenze,
    getAssenzeDetails,
}