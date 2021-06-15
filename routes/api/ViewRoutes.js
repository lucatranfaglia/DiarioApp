const { Router } = require('express');
const router = Router();



router.get('/materie', async function(req, res, next) {
    try {

        // Lista materie - 


        // Lista MateriaUser


    } catch (error) {
        res.status(500).send("Error view materie: " + error);
    }
});


module.exports = router;