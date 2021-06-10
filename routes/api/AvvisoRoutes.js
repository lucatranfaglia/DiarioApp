const { Router } = require('express');
const router = Router();


const {
    saveAvviso,
    updateAvviso,
    deleteAvviso,
    getAvviso,
    getAvvisi,
} = require('../../controllers/Avviso');

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * Avviso - nuova avviso dell'utente
 * @param {bigint} userId
 * @param {date} data
 * @param {string} indiceColore
 * @param {string} notifica
 * @param {string} testo
 * @param {string} titolo 
 */
router.post('/:userId/new/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const newAvviso = await saveAvviso(userId, req.body);
        res.status(newAvviso ? 200 : 404).json(newAvviso ? newAvviso : "newAvviso: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * Avviso - Modifica avviso dell'utente
 * @param {bigint} avvisoId 
 * @param {date} data
 * @param {string} indiceColore
 * @param {string} notifica
 * @param {string} testo
 * @param {string} titolo 
 */
router.put('/:avvisoId/update/', async(req, res) => {
    try {
        const avvisoId = req.params.avvisoId;
        const result = await updateAvviso(avvisoId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getAvviso(avvisoId);
        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * Avviso - Rimuovo l'avviso dell'utente
 */
router.delete('/:avvisoId/delete/', async(req, res) => {
    try {
        const avvisoId = req.params.avvisoId;
        const deleteResult = await deleteAvviso(avvisoId);
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
        const listAvvisi = await getAvvisi(userId);
        res.status(listAvvisi ? 200 : 404).json(listAvvisi ? listAvvisi : "listAvvisi: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

router.get('/:avvisoId/', async(req, res) => {
    try {
        const avvisoId = req.params.avvisoId;
        const listAvviso = await getAvviso(avvisoId);
        res.status(listAvviso ? 200 : 404).json(listAvviso ? listAvviso : "listAvviso: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------





module.exports = router;