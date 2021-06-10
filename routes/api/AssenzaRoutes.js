const { Router } = require('express');
const router = Router();


const {
    saveAssenza,
    updateAssenza,
    deleteAssenza,
    getAssenza,
    getAssenze,
} = require('../../controllers/Assenza');

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * Assenza - nuova Assenza dell'utente
 * @param {bigint} userId
 * @param {date} data
 */
router.post('/:userId/new/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const newAssenza = await saveAssenza(userId, req.body);
        res.status(newAssenza ? 200 : 404).json(newAssenza ? newAssenza : "newAssenza: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * Assenza - Modifica Assenza dell'utente
 * @param {bigint} AssenzaId 
 * @param {date} data
 */
router.put('/:assenzaId/update/', async(req, res) => {
    try {
        const assenzaId = req.params.assenzaId;
        const result = await updateAssenza(assenzaId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getAssenza(assenzaId);
        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * Assenza - Rimuovo l'Assenza dell'utente
 */
router.delete('/:assenzaId/delete/', async(req, res) => {
    try {
        const assenzaId = req.params.assenzaId;
        const deleteResult = await deleteAssenza(assenzaId);
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
        const listAssenze = await getAssenze(userId);
        res.status(listAssenze ? 200 : 404).json(listAssenze ? listAssenze : "listAssenze: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

router.get('/:assenzaId/', async(req, res) => {
    try {
        const assenzaId = req.params.assenzaId;
        const listAssenza = await getAssenza(assenzaId);
        res.status(listAssenza ? 200 : 404).json(listAssenza ? listAssenza : "listAssenza: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------





module.exports = router;