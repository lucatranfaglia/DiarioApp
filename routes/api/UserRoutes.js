const path = require('path');

const { Router } = require('express');
const router = Router();


const { saveIstituto, getIstituto, saveUserChildren } = require('../../controllers/User');


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
 * Istituto: inserimento di un nuovo istituto nel db (nome dell'istituto e la citta)
 * @param string istituto 
 * @param string citta 
 */
router.post('/istituto/new', async(req, res) => {
    try {
        // Salvo un nuovo istituto
        const { id, istituto, citta } = await saveIstituto(req.body);

        // object - nuovo istituto
        const new_istituto = { id, istituto, citta };

        res.status(id ? 200 : 404).json(id ? new_istituto : "Error result")

    } catch (error) {
        res.status(500).send(error.toString());
    }
})



module.exports = router;