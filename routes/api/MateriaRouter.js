const { Router } = require('express');
const router = Router();


const { saveMateria, getMateria, SaveMateriaUser } = require('../../controller/Materia');

const { infoUser } = require('../../controller/User');


/**
 * Materia - lista di materie
 */
router.get('/materie', async(req, res) => {
    try {
        const materie = await getMateria();
        res.status(materie ? 200 : 404).json(materie ? materie : "materie: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * Materia: inserimento di una nuova Materia nel db (nome della materia)
 * @param string nome 
 */
router.post('/new', async(req, res) => {
    try {
        // Salvo una nuova materia
        const { id, nome } = await saveMateria(req.body);

        // object - nuova materia
        const new_materia = { id, nome };
        res.status(id ? 200 : 404).json(id ? new_materia : "materia: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

/**
 * MateriaUser: collego la materia allo UserId -> inserimento di una nuova MateriaUser nel db 
 * @param {bigint} userId
 * @param {bigint} istitutoId
 */
router.post('/user/:userId/', async(req, res) => {
    try {

        const userId = req.params.userId;

        // ottengo l'istitutoId dal userId
        const { istitutoId } = await infoUser(userId);


        // Salvo una nuova materiaUser
        const newMateriaUser = await SaveMateriaUser(userId, istitutoId, req.body);

        res.status(newMateriaUser ? 200 : 404).json(newMateriaUser ? newMateriaUser : "newMateriaUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------





module.exports = router;