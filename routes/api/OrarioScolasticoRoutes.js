const { Router } = require('express');
const router = Router();


const {
    saveOrario,
    updateOrario,
    deleteOrario,
    getOrario,
    getMateriaOrario,
    getUserOrario
} = require('../../controllers/OrarioScolastico');

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * OrarioScolastico - viene aggiunto un nuovo orario della materia, tramite materiaUserId
 * @param {bigint} materiaUserId
 * @param {string} aula
 * @param {enum} giorno
 * @param {date} data_inizio
 * @param {date} data_fine
 */
router.post('/:materiaUserId/new/', async(req, res) => {
    try {

        const materiaUserId = req.params.materiaUserId;
        console.log("data: ", materiaUserId, req.body);
        const newOrario = await saveOrario(materiaUserId, req.body);
        res.status(newOrario ? 200 : 404).json(newOrario ? newOrario : "newOrario: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * OrarioScolastico - modifico l'orario della materia, tramite orarioId
 * @param {bigint} orarioId 
 * @param {string} aula
 * @param {enum} giorno
 * @param {date} data_inizio
 * @param {date} data_fine
 */
router.put('/:orarioId/update/', async(req, res) => {
    try {
        const orarioId = req.params.orarioId;
        const result = await updateOrario(orarioId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getOrario(orarioId);
        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * OrarioScolastico - Rimuovo l'orario della materia tramite orarioId
 * @param {bigint} orarioId 
 */
router.delete('/:orarioId/delete/', async(req, res) => {
    try {
        const orarioId = req.params.orarioId;
        const deleteResult = await deleteOrario(orarioId);
        res.status(deleteResult ? 200 : 404).json(deleteResult ? deleteResult : "deleteResult: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * SELECT - vengono selezionati tutti i voti di tutte le materia dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns [{object}]
 */
router.get('/user/:userId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const listAllUserOrario = await getUserOrario(userId);
        res.status(listAllUserOrario ? 200 : 404).json(listAllUserOrario ? listAllUserOrario : "listAllUserOrario: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * SELECT - vengono selezionati tutti i voti di una materia, tramite materiaUserId
 * @param {bigint} materiaUserId 
 * @returns [{object}]
 */
router.get('/materiaUser/:materiaUserId/', async(req, res) => {
    try {
        const materiaUserId = req.params.materiaUserId;
        const listAllOrario = await getMateriaOrario(materiaUserId);
        res.status(listAllOrario ? 200 : 404).json(listAllOrario ? listAllOrario : "listAllOrario: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * SELECT - viene selezionato un voto di una materia tramite OrarioId
 * @param {bigint} orarioId 
 * @returns {object}
 */
router.get('/info/:orarioId/', async(req, res) => {
    try {
        const orarioId = req.params.orarioId;
        const listOrario = await getOrario(orarioId);
        res.status(listOrario ? 200 : 404).json(listOrario ? listOrario : listOrario);

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

module.exports = router;