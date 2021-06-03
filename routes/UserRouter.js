const { Router } = require('express');
const router = Router();

const { saveIstituto, getIstituto } = require('../controller/User');


/**
 * User
 */
router.get('/', async(req, res) => {
    try {
        const istituti = await getIstituto();
        console.log("istituti: ", istituti);
        res.render('user', { istituti });
    } catch (error) {
        console.log("Error / :", error);
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/');
    }
})


/**
 * Istituto: l'utente inserisco il nome dell'istituto e la città
 */
router.post('/istituto/new', async(req, res) => {
    try {

        // const {name, email, password} = req.body;
        console.log("req.body: ", req.body);
        const { id, istituto, localita } = await saveIstituto(req.body);

        // object
        const User = { id, istituto, localita };

        // verificare se l'utente è loggato
        req.session.user = User

        res.status(id ? 200 : 404).json(id ? User : "Error result")

    } catch (error) {
        console.log("Error / :", error);
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/');
    }
})



module.exports = router;