const { Router } = require('express');
const router = Router();


const {
    saveRos,
    updateRos,
    deleteRos,
    getRos,
    getAllRos,
} = require('../../controllers/Ros');

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * Ros - nuovo Ros dell'utente
 * @param {bigint} userId
 * @param {date} data
 * @param {float} ora
 * @param {enum} tipologia
 */
router.post('/:userId/new/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const newRos = await saveRos(userId, req.body);
        res.status(newRos ? 200 : 404).json(newRos ? newRos : "newRos: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * Ros - Modifica Ros dell'utente
 * @param {bigint} rosId 
 * @param {date} data
 */
router.put('/:rosId/update/', async(req, res) => {
    try {
        const rosId = req.params.rosId;
        const result = await updateRos(rosId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getRos(rosId);
        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * Ros - Rimuovo l'Ros dell'utente
 */
router.delete('/:rosId/delete/', async(req, res) => {
    try {
        const rosId = req.params.rosId;
        const deleteResult = await deleteRos(rosId);
        res.status(deleteResult ? 200 : 404).json(deleteResult ? deleteResult : "deleteResult: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

router.get('/user/:userId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const listAllRoss = await getAllRos(userId);
        res.status(listAllRoss ? 200 : 404).json(listAllRoss ? listAllRoss : "listAllRoss: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

router.get('/:rosId/', async(req, res) => {
    try {
        const rosId = req.params.rosId;
        const listRos = await getRos(rosId);
        res.status(listRos ? 200 : 404).json(listRos ? listRos : "listRos: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------





module.exports = router;