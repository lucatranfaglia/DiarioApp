const {
    Professore,
    ProfessoreUser,
    Ricevimento,
    Recensione,
    Istituto,
    Istruzione,
    User,
    MateriaUser
} = require('../models');


const db = require('../services/db.service');

/**
 * ADD - aggiungo un nuovo Professore nel db
 * @param {bigint} istitutoId
 * @param {bigint} materiaId
 * @param {bigint} professoreId
 * @returns {object}
 */
async function saveProfessoreUser(istitutoId, userId, materiaUserId, professoreId) {
    try {
        return await ProfessoreUser.create({
            userId,
            istitutoId,
            materiaUserId,
            professoreId
        });
    } catch (error) {
        throw error;
    }
}


/**
 * ADD - aggiungo un nuovo Professore nel db
 * @param {string} nome
 * @param {string} cognome
 * @param {string} email
 * @param {integer} telefono
 * @returns {object}
 */
async function saveProfessore(istitutoId, { nome = null, cognome = null, email = null, telefono = null }) {
    try {
        return await Professore.create({
            istitutoId,
            nome,
            cognome,
            email,
            telefono
        });
    } catch (error) {
        throw error;
    }
}

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

/**
 * SELECT - seleziono tutti i prof. presenti nel db
 * @returns [object]
 */
async function getProfessori() {
    try {
        return await Professore.findAll();
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono tutti i prof.  con il dettaglio dell'istituto e istruzione della scuola
 * @returns [{object}]
 */
async function getProfessoriDetails() {
    try {
        return await db.sequelize.query(
            `SELECT 
                    "Professore"."id" as professoreId,
                    "Professore"."nome",
                    "Professore"."cognome",
                    "Professore"."email",
                    "Professore"."telefono",
                    "Istruzione"."istruzione",
                    "Istituto"."istituto",
                    "Istituto"."citta"
                FROM 
                    "Professore",
                    "Istituto",
                    "Istruzione"
                WHERE "Istituto"."id"="Professore"."istitutoId"
                    AND "Istruzione"."id"="Istituto"."istruzioneId"
                `, {
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono tutti i prof. con il dettaglio dell'istituto tramite professoreId
 * @param {bigint} professoreId
 * @returns [{object}]
 */
async function getProfessoreDetails(professoreId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                    "Professore"."id" as professoreId,
                    "Professore"."nome",
                    "Professore"."cognome",
                    "Professore"."email",
                    "Professore"."telefono",
                    "Istruzione"."istruzione",
                    "Istituto"."istituto",
                    "Istituto"."citta"
                FROM 
                    "Professore",
                    "Istituto",
                    "Istruzione"
                WHERE 
                    "Professore"."id"=:professoreId
                    AND "Istituto"."id"="Professore"."istitutoId"
                    AND "Istruzione"."id"="Istituto"."istruzioneId"
                `, {
                replacements: { professoreId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}

// ------------------------------------------------------------------------------------------------------------

/**
 * SELECT - seleziono tutti i prof. dell'utente, tramite userId
 * @param {bigint} userId
 * @returns [{object}]
 */
async function getProfessoreUser(professoreUserId) {
    try {
        return await ProfessoreUser.findAll({
            where: {
                professoreUserId
            }
        });
    } catch (error) {
        throw error;
    }
}


/**
 * SELECT - seleziono tutti i prof. dell'utente nel dettaglio, tramite userId
 * @param {bigint} userId
 * @returns [{object}]
 */
async function getProfessoreUserDetails(professoreUserId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                    "User"."nickname",
                    "ProfessoreUser".*,
                    "Professore"."nome",
                    "Professore"."cognome",
                    "Professore"."email",
                    "Professore"."telefono",
                    "Istruzione"."istruzione",
                    "Istituto"."istituto",
                    "Istituto"."citta"
                FROM 
                    "ProfessoreUser",
                    "Istituto",
                    "Istruzione",
                    "User",
                    "MateriaUser",
                    "Professore"
                WHERE 
                    "ProfessoreUser"."id"=:professoreUserId
                    AND "Istituto"."id"="ProfessoreUser"."istitutoId"
                    AND "Istruzione"."id"="Istituto"."istruzioneId"
                    AND "User"."id"="ProfessoreUser"."userId"
                    AND "MateriaUser"."id"="ProfessoreUser"."materiaUserId"
                    AND "Professore"."id"="ProfessoreUser"."professoreId"

                `, {
                replacements: { professoreUserId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}


// ------------------------------------------------------------------------------------------------------------

/**
 * SELECT - seleziono tutti i prof. dell'utente, tramite userId
 * @param {bigint} userId
 * @returns [{object}]
 */
async function getProfessoreUserByUserId(userId) {
    try {

        return await ProfessoreUser.findAll({
            where: {
                userId
            }
        });

    } catch (error) {
        throw error;
    }
}




/**
 * SELECT - seleziono tutti i prof. dell'utente nel dettaglio, tramite userId
 * @param {bigint} userId
 * @returns [{object}]
 */
async function getProfessoreUserByUserIdDetails(userId) {
    try {
        return await db.sequelize.query(
            `SELECT 
                    "User"."nickname",
                    "Istruzione"."istruzione",
                    "Istituto"."istituto",
                    "Istituto"."citta",
                    "Materia"."nome" as nome_materia,
                    "Professore"."nome" as nome_professore,
                    "Professore"."cognome" as cognome_professore,
                    "Professore"."email",
                    "Professore"."telefono"
                FROM 
                    "ProfessoreUser",
                    "Istituto",
                    "Istruzione",
                    "User",
                    "MateriaUser",
                    "Materia",
                    "Professore"
                WHERE 
                    "ProfessoreUser"."userId"=:userId
                    AND "Istituto"."id"="ProfessoreUser"."istitutoId"
                    AND "Istruzione"."id"="Istituto"."istruzioneId"
                    AND "User"."id"="ProfessoreUser"."userId"
                    AND "MateriaUser"."id"="ProfessoreUser"."materiaUserId"
                    AND "MateriaUser"."materiaId"="Materia"."id"
                    AND "Professore"."id"="ProfessoreUser"."professoreId"

                `, {
                replacements: { userId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono tutti i prof. dell'utente nel dettaglio, tramite userId
 * @param {bigint} userId
 * @returns [{object}]
 */
async function getProfessoreUserByUserIdDetails_v2(userId) {
    try {
        return await ProfessoreUser.findAll({
            where: {
                userId
            },
            include: [{
                model: Istituto,
                required: false
            }, {
                model: User,
                required: false
            }, {
                model: MateriaUser,
                required: false
            }, {
                model: Professore,
                required: false
            }]
        });
    } catch (error) {
        throw error;
    }
}
// ------------------------------------------------------------------------------------------------------------
// ------------ RICEVIMENTO -----------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------


/**
 * ADD - aggiungo un nuovo Ricevimento di un Professore nel db
 * @param {bigint} professoreId
 * @param {enum} giorno
 * @param {time} ora_inizio
 * @param {time} ora_fine
 * @param {string} luogo
 * @returns {object}
 */
async function saveProfessoreRicevimento(professoreId, { giorno = null, ora_inizio = null, ora_fine = null, luogo = null }) {
    try {
        return await Ricevimento.create({
            professoreId,
            giorno,
            ora_inizio,
            ora_fine,
            luogo
        });
    } catch (error) {
        throw error;
    }
}

/**
 * UPDATE - MODIFICO un Ricevimento di un Professore nel db
 * @param {bigint} ricevimentoId
 * @param {enum} giorno
 * @param {time} ora_inizio
 * @param {time} ora_fine
 * @param {string} luogo
 * @returns [1 | 0]
 */
async function updateProfessoreRicevimento(ricevimentoId, { giorno, ora_inizio, ora_fine, luogo }) {
    try {
        return await Ricevimento.update({
            giorno,
            ora_inizio,
            ora_fine,
            luogo
        }, {
            where: {
                id: ricevimentoId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono il ricevimento tramite ricevimentoId
 * @param {bigint} ricevimentoId
 * @returns [object]
 */
async function getProfessoreRicevimentoById(ricevimentoId) {
    try {
        return await Ricevimento.findByPk(ricevimentoId);
    } catch (error) {
        throw error;
    }
}

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------


/**
 * SELECT - seleziono tutti i riceviment di UN prof. presenti nel db
 * @param {bigint} professoreId
 * @returns [object]
 */
async function getProfessoreRicevimento(professoreId) {
    try {
        return await Ricevimento.findAll({
            where: {
                professoreId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono tutti i riceviment di UN prof. presenti nel db
 * @param {bigint} professoreId
 * @returns [{object}]
 */
async function getProfessoriRicevimentoByUserId(userId) {
    try {
        return await db.sequelize.query(
            `SELECT "User"."userId", 
                    "Professore"."nome",
                    "Professore"."cognome",
                    "Ricevimento".* 
                FROM "ProfessoreUser" as "User", 
                    "Ricevimento",
                    "Professore"
                WHERE "User"."userId" =:userId  
                    AND "Ricevimento"."professoreId"="User"."professoreId"
                    AND "Professore"."id"="User"."professoreId"
                    AND "Professore"."id"="Ricevimento"."professoreId"
                `, {
                replacements: { userId: userId },
                type: db.sequelize.QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw error;
    }
}


// -----------------------------------------------------------------------------------------------------------
// ------------ RECENSIONI -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------
/**
 * SELECT - seleziono tutte le recensioni di UN prof. presenti nel db
 * @param {bigint} professoreId
 * @returns [object]
 */
async function getProfessoreRecensioni(professoreId) {
    try {
        return await Recensione.findAll({
            where: {
                professoreId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * ADD - aggiungo una nuova Recensione di un Professore nel db
 * @param {bigint} professoreId
 * @param {string} titolo
 * @param {text} descrizione
 * @param {integer} voto
 * @returns {object}
 */
async function saveProfessoreRecensione(professoreId, { titolo = null, descrizione = null, voto = null }) {
    try {
        return await Recensione.create({
            professoreId,
            titolo,
            descrizione,
            voto
        });
    } catch (error) {
        throw error;
    }
}

/**
 * UPDATE - MODIFICO un Ricevimento di un Professore nel db
 * @param {bigint} recensioneId
 * @param {string} titolo
 * @param {text} descrizione
 * @param {integer} voto
 * @returns [1 | 0]
 */
async function updateProfessoreRecensione(recensioneId, { titolo, descrizione, voto }) {
    try {
        return await Recensione.update({
            titolo,
            descrizione,
            voto
        }, {
            where: {
                id: recensioneId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - seleziono la recesione tramite recensioneId
 * @param {bigint} recensioneId
 * @returns [object]
 */
async function getProfessoreRecensioneIdById(recensioneId) {
    try {
        return await Recensione.findByPk(recensioneId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    saveProfessore,
    saveProfessoreUser,
    getProfessori,
    getProfessoriDetails,
    getProfessoreDetails,


    // -------------------------------
    getProfessoreUser,
    getProfessoreUserDetails,


    getProfessoreUserByUserId,
    getProfessoreUserByUserIdDetails,
    // -------------------------------

    saveProfessoreRicevimento,
    updateProfessoreRicevimento,
    getProfessoreRicevimento,
    getProfessoriRicevimentoByUserId,
    getProfessoreRicevimentoById,

    // -------------------------------

    saveProfessoreRecensione,
    updateProfessoreRecensione,
    getProfessoreRecensioni,
    getProfessoreRecensioneIdById
}