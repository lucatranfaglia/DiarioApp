const { Router } = require('express');
const router = Router();


const { saveMateria, getMateria, SaveMateriaUser } = require('../../controllers/Materia');

const { infoUser } = require('../../controllers/User');


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
 * @param {bigint} materiaId
 * @param {bigint} professoreId
 */
router.post('/user/:userId/:materiaId/:professoreId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const materiaId = req.params.materiaId;
        const professoreId = req.params.professoreId;

        // ottengo l'istitutoId dal userId
        const { istitutoId } = await infoUser(userId);

        // Salvo una nuova materiaUser
        const newMateriaUser = await SaveMateriaUser(userId, istitutoId, materiaId, professoreId, req.body);

        res.status(newMateriaUser ? 200 : 404).json(newMateriaUser ? newMateriaUser : "newMateriaUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------





module.exports = router;