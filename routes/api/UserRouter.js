const path = require('path');

const { Router } = require('express');
const router = Router();


const { saveIstituto, getIstituto } = require('../../controller/User');


// MIDDLEWARE
const logger = (req, res, next) => {
    if (req.params != {}) {
        console.log('calling server with params', req.params);
    }
    next();
}



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
 * Istituto: inserimento di un nuovo istituto nel db (nome dell'istituto e la localita)
 * @param string istituto 
 * @param string localita 
 */
router.post('/istituto/new', async(req, res) => {
    try {
        // Salvo un nuovo istituto
        const { id, istituto, localita } = await saveIstituto(req.body);

        // object - nuovo istituto
        const new_istituto = { id, istituto, localita };

        res.status(id ? 200 : 404).json(id ? new_istituto : "Error result")

    } catch (error) {
        res.status(500).send(error.toString());
    }
})



module.exports = router;