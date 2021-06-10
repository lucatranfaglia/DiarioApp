const { Avviso } = require('../models')

/**
 * Avviso: inserimento di un nuovo Avvido nel db tramite UserId
 * @param {bigint} userId
 * @param {date} data
 * @param {string} indiceColore
 * @param {string} notifica
 * @param {string} testo
 * @param {string} titolo 
 * @returns {object}
 */
async function saveAvviso(userId, { data = null, indiceColore = null, notifica = null, testo = null, titolo = null }) {
    try {
        return await Avviso.create({
            userId,
            data,
            indiceColore,
            notifica,
            testo,
            titolo
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Avviso: Modifica di un Avvido nel db tramite avvisoId
 * @param {bigint} avvisoId 
 * @param {date} data
 * @param {string} indiceColore
 * @param {string} notifica
 * @param {string} testo
 * @param {string} titolo 
 * @returns 
 */
async function updateAvviso(avvisoId, { data, indiceColore, notifica, testo, titolo }) {
    try {

        return await Avviso.update({
            data,
            indiceColore,
            notifica,
            testo,
            titolo
        }, {
            where: {
                id: avvisoId
            }
        });
    } catch (error) {
        throw error;
    }
}


/**
 * DELETE - elimino l'avviso nel db tramite avvisoId
 * @param {bigint} avvisoId 
 * @returns 
 */
async function deleteAvviso(avvisoId) {
    try {
        return await Avviso.destroy({
            where: {
                id: avvisoId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - viene selezionato un avviso tramite avvisoId
 * @param {bigint} avvisoId 
 * @returns [{object}]
 */
async function getAvviso(avvisoId) {
    try {
        return await Avviso.findByPk(avvisoId);
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - vengono selezionati tutti gli avvisi dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns {object}
 */
async function getAvvisi(userId) {
    try {
        return await Avviso.findAll({
            where: {
                userId
            }
        });
    } catch (error) {
        throw error;
    }
}




module.exports = {
    saveAvviso,
    updateAvviso,
    deleteAvviso,
    getAvviso,
    getAvvisi,
}