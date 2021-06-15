const { Router } = require('express');
const router = Router();


const {
    saveMateria,
    saveMateriaUser,
    getMaterie,
    getMateriaUser,
    getMaterieUserDetails,
    getMateriaUserDetails
} = require('../../controllers/Materia');

const { infoUser } = require('../../controllers/User');


/**
 * Materia - lista di tutte le materie presenti nel db
 */
router.get('/materie', async(req, res) => {
    try {
        const materie = await getMaterie();
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
router.post('/user/:userId/materia/:materiaId/professore/:professoreId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const materiaId = req.params.materiaId;
        const professoreId = req.params.professoreId;

        // ottengo l'istitutoId dal userId
        const { istitutoId } = await infoUser(userId);

        // Salvo una nuova materiaUser
        const newMateriaUser = await saveMateriaUser(userId, istitutoId, materiaId, professoreId, req.body);

        res.status(newMateriaUser ? 200 : 404).json(newMateriaUser ? newMateriaUser : "newMateriaUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * MateriaUser: collego la materia allo UserId -> inserimento di una nuova MateriaUser nel db 
 * @param {bigint} userId
 */
router.post('/user/:userId/', async(req, res) => {
    try {
        const userId = req.params.userId;

        // ottengo l'istitutoId dal userId
        const { istitutoId } = await infoUser(userId);

        // Salvo una nuova materiaUser
        const newMateriaUser = await saveMateriaUser(userId, istitutoId, req.body);

        res.status(newMateriaUser ? 200 : 404).json(newMateriaUser ? newMateriaUser : "newMateriaUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------


/**
 * MateriaUser: visualizzo una materia dell'utente
 * @param {bigint} userId
 * @param {bigint} materiaId
 */
router.get('/user/:userId/materia/:materiaId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const materiaId = req.params.materiaId;
        const DataMateriaUser = await getMateriaUser(userId, materiaId);
        res.status(DataMateriaUser ? 200 : 404).json(DataMateriaUser ? DataMateriaUser : "DataMateriaUser: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * MateriaUser: visualizzo tutte le materie dell'utente
 * @param {bigint} userId
 * @param {bigint} materiaId
 */
router.get('/user/:userId/materie/', async(req, res) => {
    try {

        const userId = req.params.userId;

        const DataMateriaUser = await getMaterieUserDetails(userId);
        res.status(DataMateriaUser ? 200 : 404).json(DataMateriaUser ? DataMateriaUser : "DataMateriaUser: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * MateriaUser: visualizzo una materia dell'utente
 * @param {bigint} userId
 * @param {bigint} materiaId
 */
router.get('/user/:userId/materia/:materiaId/details/', async(req, res) => {
    try {

        const userId = req.params.userId;
        const materiaId = req.params.materiaId;
        const DataMateriaUser = await getMateriaUserDetails(userId, materiaId);
        res.status(DataMateriaUser ? 200 : 404).json(DataMateriaUser[0] ? DataMateriaUser[0] : "DataMateriaUser: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------





module.exports = router;