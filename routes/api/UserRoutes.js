const path = require('path');

const { Router } = require('express');
const router = Router();


const {
    saveIstituto,
    getIstituto,
    saveUserChildren,
    getIstruzione,
    saveIstruzione
} = require('../../controllers/User');


// MIDDLEWARE
const logger = (req, res, next) => {
    if (req.params != {}) {
        console.log('calling server with params', req.params);
    }
    next();
}

/**
 * Creo il profilo per figli dell'utente
 */
router.post('/:userAuthId/children/new/', async(req, res) => {
    try {
        const userAuthId = req.params.userAuthId;
        const newUserChild = await saveUserChildren(userAuthId, req.body);
        res.status(newUserChild ? 200 : 404).json(newUserChild ? newUserChild : "newUserChild: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

/**
 * Istituti - lista di istituti
 */
router.get('/istituti', async(req, res) => {
    try {
        const istituti = await getIstituto();
        res.status(istituti ? 200 : 404).json(istituti ? istituti : "istituti: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * Istituti - lista di istituti
 */
router.get('/istituti/:istitutiId/', async(req, res) => {
    try {
        const istituti = await getIstituto();
        res.status(istituti ? 200 : 404).json(istituti ? istituti : "istituti: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * Istituto: inserimento di un nuovo istituto nel db (nome dell'istituto e la citta)
 * @param bigint istruzioneId 
 * @param string istituto 
 * @param string citta 
 */
router.post('/istruzione/:istruzioneId/istituto/new/', async(req, res) => {
    try {

        const istruzioneId = req.params.istruzioneId;

        // Salvo un nuovo istituto
        const new_istituto = await saveIstituto(istruzioneId, req.body);


        res.status(new_istituto ? 200 : 404).json(new_istituto ? new_istituto : "Error result")

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

/**
 * Istruzione - lista di tipo di istruzioni
 */
router.get('/istruzione/', async(req, res) => {
    try {
        const istruzioni = await getIstruzione();
        res.status(istruzioni ? 200 : 404).json(istruzioni ? istruzioni : "istruzioni: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * istruzione: inserimento di un nuovo istituto nel db (nome dell'istruzione)
 * @param string istituto 
 * @param string citta 
 */
router.post('/istruzione/new/', async(req, res) => {
    try {
        // Salvo una nuova istruzione
        const { id, istruzione } = await saveIstruzione(req.body);

        // object - nuovo istituto
        const new_istruzione = { id, istruzione };

        res.status(id ? 200 : 404).json(id ? new_istruzione : "new_istruzione: not found!")

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

module.exports = router;