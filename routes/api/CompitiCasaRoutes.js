const { Router } = require('express');
const router = Router();


const {
    saveCompito,
    updateCompito,
    deleteCompito,
    getCompito,
    getUserCompiti,
    getMateriaCompiti,
    getMaterieCompitiData,
    getCompitiData
} = require('../../controllers/CompitiCasa');

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * CompitiCasa - viene aggiunto nuova compito della materia, tramite materiaUserId
 * @param {bigint} materiaUserId
 * @param {date} data
 * @param {integer} priorita
 * @param {integer} stato
 * @param {string} testo
 * @param {integer} notifica
 */
router.post('/:materiaUserId/new/', async(req, res) => {
    try {
        const materiaUserId = req.params.materiaUserId;
        const newCompito = await saveCompito(materiaUserId, req.body);
        res.status(newCompito ? 200 : 404).json(newCompito ? newCompito : "newCompito: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * CompitoCasa - Modifica il compito della materia, tramite compitoId
 * @param {bigint} compitoId 
 * @param {date} data
 * @param {integer} priorita
 * @param {integer} stato
 * @param {string} testo
 * @param {integer} notifica
 */
router.put('/:compitoId/update/', async(req, res) => {
    try {
        const compitoId = req.params.compitoId;
        const result = await updateCompito(compitoId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getCompito(compitoId);
        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * Compito - Rimuovo il compito dell'utente
 */
router.delete('/:compitoId/delete/', async(req, res) => {
    try {
        const CompitoId = req.params.CompitoId;
        const deleteResult = await deleteCompito(CompitoId);
        res.status(deleteResult ? 200 : 404).json(deleteResult ? deleteResult : "deleteResult: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
/**
 * SELECT - vengono selezionati tutti i compiti di tutte le materia dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns [{object}]
 */
router.get('/user/:userId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const listCompiti = await getUserCompiti(userId);
        res.status(listCompiti ? 200 : 404).json(listCompiti ? listCompiti : "listCompiti: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * SELECT - vengono selezionati tutti i compiti di una materia, tramite materiaUserId
 * @param {bigint} materiaUserId 
 * @returns [{object}]
 */
router.get('/materiaUser/:materiaUserId/', async(req, res) => {
    try {
        const materiaUserId = req.params.materiaUserId;
        const listAllMateriaVoti = await getMateriaCompiti(materiaUserId);
        res.status(listAllMateriaVoti ? 200 : 404).json(listAllMateriaVoti ? listAllMateriaVoti : "listAllMateriaVoti: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})



/**
 * SELECT - viene selezionato un compito di una materia tramite compitoId
 * @param {bigint} compitoId 
 * @returns {object}
 */
router.get('/:compitoId/', async(req, res) => {
    try {
        const compitoId = req.params.compitoId;
        const listCompito = await getCompito(compitoId);
        res.status(listCompito ? 200 : 404).json(listCompito ? listCompito : "listCompito: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * SELECT - viene selezionato un compito di una materia tramite materiaUserId e la data
 * @param {bigint} materiaUserId 
 * @param {date} data 
 * @returns {object}
 */

router.get('/materiaUser/:materiaUserId/giorno/', async(req, res) => {
    try {
        const materiaUserId = req.params.materiaUserId;
        const listCompitoMateriaData = await getMaterieCompitiData(materiaUserId, req.body);
        res.status(listCompitoMateriaData ? 200 : 404).json(listCompitoMateriaData ? listCompitoMateriaData : "listCompitoMateriaData: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * SELECT - viene selezionato tutti i compito di un giorno tramite la data
 * @param {date} data 
 * @returns {object}
 */

router.get('/lista/giorno/', async(req, res) => {
        try {
            const listCompitoData = await getCompitiData(req.body);
            res.status(listCompitoData ? 200 : 404).json(listCompitoData ? listCompitoData : "listCompitoData: not found!");

        } catch (error) {
            res.status(500).send(error.toString());
        }
    })
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------





module.exports = router;