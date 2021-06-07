const Professore = require('../models').Professore;
const ProfessoreUser = require('../models').ProfessoreUser;

const Ricevimento = require('../models/').Ricevimento;
const Recensione = require('../models/').Recensione;

const db = require('../services/db.service');

/**
 * ADD - aggiungo un nuovo Professore nel db
 * @param {bigint} istitutoId
 * @param {bigint} materiaId
 * @param {bigint} professoreId
 * @returns {object}
 */
async function saveProfessoreUser(istitutoId, userId, materiaId, professoreId) {
    try {
        return await ProfessoreUser.create({
            userId,
            istitutoId,
            materiaId,
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
                FROM "ProfessoreUsers" as "User", 
                    "Ricevimentos" as "Ricevimento",
                    "Professores" as "Professore" 
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
    getProfessori,
    saveProfessore,
    saveProfessoreUser,
    saveProfessoreRicevimento,

    updateProfessoreRicevimento,

    getProfessoreRicevimento,
    getProfessoriRicevimentoByUserId,
    getProfessoreRicevimentoById,


    saveProfessoreRecensione,
    updateProfessoreRecensione,
    getProfessoreRecensioni,
    getProfessoreRecensioneIdById
}