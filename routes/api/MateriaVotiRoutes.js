const { Router } = require('express');
const router = Router();


const {
    saveMateriaVoti,
    updateMateriaVoti,
    deleteMateriaVoti,
    getMateriaVoti,
    getAllMateriaVoti,
    getAllMateriaVotiDetails,
    getAllUserMateriaVoti,
    getAllUserMateriaVotiDetails,
    getMateriaVotiByUserId,
} = require('../../controllers/MateriaVoti');

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * MateriaVoti - nuovo MateriaVoti dell'utente
 * @param {bigint} materiaUserId
 * @param {enum} tipologia
 * @param {float} voto
 * @param {date} data
 * @param {integer} notifica
 */
router.post('/:materiaUserId/new/', async(req, res) => {
    try {

        const materiaUserId = req.params.materiaUserId;
        console.log("data: ", materiaUserId, req.body);
        const newMateriaVoti = await saveMateriaVoti(materiaUserId, req.body);
        res.status(newMateriaVoti ? 200 : 404).json(newMateriaVoti ? newMateriaVoti : "newMateriaVoti: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * MateriaVoti - Modifica MateriaVoti dell'utente
 * @param {bigint} materiaVotiId 
 * @param {enum} tipologia
 * @param {float} voto
 * @param {date} data
 * @param {integer} notifica
 */
router.put('/:materiaVotiId/update/', async(req, res) => {
    try {
        const materiaVotiId = req.params.materiaVotiId;
        const result = await updateMateriaVoti(materiaVotiId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getMateriaVoti(materiaVotiId);
        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * MateriaVoti - Rimuovo l'MateriaVoti dell'utente tramite materiaVotiId
 */
router.delete('/:materiaVotiId/delete/', async(req, res) => {
    try {
        const materiaVotiId = req.params.materiaVotiId;
        const deleteResult = await deleteMateriaVoti(materiaVotiId);
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
        const listAllUserMateriaVoti = await getAllUserMateriaVoti(userId);
        res.status(listAllUserMateriaVoti ? 200 : 404).json(listAllUserMateriaVoti ? listAllUserMateriaVoti : "listAllUserMateriaVoti: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * SELECT - vengono selezionati tutti i voti di tutte le materia dell'utente, tramite userId
 * @param {bigint} userId 
 * @returns [{object}]
 */
router.get('/user/:userId/details/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const listAllUserMateriaVoti = await getAllUserMateriaVotiDetails(userId);
        res.status(listAllUserMateriaVoti ? 200 : 404).json(listAllUserMateriaVoti ? listAllUserMateriaVoti : "listAllUserMateriaVoti: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * SELECT - vengono selezionati tutti i voti di una materia, tramite materiaUserId
 * @param {bigint} materiaUserId 
 * @returns [{object}]
 */
router.get('/materiaUser/:materiaUserId/', async(req, res) => {
    try {
        const materiaUserId = req.params.materiaUserId;
        const listAllMateriaVoti = await getAllMateriaVoti(materiaUserId);
        res.status(listAllMateriaVoti ? 200 : 404).json(listAllMateriaVoti ? listAllMateriaVoti : "listAllMateriaVoti: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * SELECT - vengono selezionati tutti i voti di una materia, tramite materiaUserId
 * @param {bigint} materiaUserId 
 * @returns [{object}]
 */
router.get('/materiaUser/:materiaUserId/details/', async(req, res) => {
    try {
        const materiaUserId = req.params.materiaUserId;
        const listAllMateriaVoti = await getAllMateriaVotiDetails(materiaUserId);
        res.status(listAllMateriaVoti ? 200 : 404).json(listAllMateriaVoti ? listAllMateriaVoti : "listAllMateriaVoti: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * SELECT - viene selezionato un voto di una materia tramite materiaVotiId
 * @param {bigint} materiaVotiId 
 * @returns {object}
 */
router.get('/:materiaVotiId/', async(req, res) => {
    try {
        const materiaVotiId = req.params.materiaVotiId;
        const listMateriaVoti = await getMateriaVoti(materiaVotiId);
        res.status(listMateriaVoti ? 200 : 404).json(listMateriaVoti ? listMateriaVoti : listMateriaVoti);

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------





module.exports = router;