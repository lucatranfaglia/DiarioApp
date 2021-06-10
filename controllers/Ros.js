const { RiduzioneOrarioScolastico } = require('../models');

/**
 * Ros: inserimento di un nuovo Avvido nel db tramite UserId
 * @param {bigint} userId
 * @param {date} data
 * @param {float} ora
 * @param {enum} tipologia
 * @returns {object}
 */
async function saveRos(userId, { data = null, ora = null, tipologia = 'ritardo' }) {
    try {
        return await RiduzioneOrarioScolastico.create({
            userId,
            data,
            ora,
            tipologia
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Ros: Modifica di un Avvido nel db tramite rosId
 * @param {bigint} rosId 
 * @param {date} data
 * @param {float} ora
 * @param {enum} tipologia
 * @returns [ 0 | 1]
 */
async function updateRos(rosId, { data, ora, tipologia }) {
    try {
        return await RiduzioneOrarioScolastico.update({
            data,
            ora,
            tipologia
        }, {
            where: {
                id: rosId
            }
        });
    } catch (error) {
        throw error;
    }
}


/**
 * DELETE - elimino l'Ros nel db tramite rosId
 * @param {bigint} rosId 
 * @returns [1 success | 0 fail ]
 */
async function deleteRos(rosId) {
    try {
        return await RiduzioneOrarioScolastico.destroy({
            where: {
                id: rosId
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - viene selezionato un Ros tramite rosId
 * @param {bigint} rosId 
 * @returns [{object}]
 */
async function getRos(rosId) {
    try {
        return await RiduzioneOrarioScolastico.findByPk(rosId);
    } catch (error) {
        throw error;
    }
}

/**
 * SELECT - vengono selezionati tutti gli AllRos dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns {object}
 */
async function getAllRos(userId) {
    try {
        return await RiduzioneOrarioScolastico.findAll({
            where: {
                userId
            }
        });
    } catch (error) {
        throw error;
    }
}




module.exports = {
    saveRos,
    updateRos,
    deleteRos,
    getRos,
    getAllRos,
}