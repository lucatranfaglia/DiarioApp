const { Router } = require('express');
const router = Router();

const { infoUser } = require('../../controller/User');

const { getProfessori, saveProfessoreUser, saveProfessore } = require('../../controller/Professore');

/**
 * Professore: lista dei professori
 * @param {bigint} userId
 */
router.get('/professori/', async(req, res) => {
    try {

        // lista dei professori
        const listProfessori = await getProfessori();

        res.status(listProfessori ? 200 : 404).json(listProfessori ? listProfessori : "listProfessori: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * Professore: aggiungo un nuovo professore nel db (tramite UserId)
 * @param {bigint} userId
 */
router.post('/new/:userId/', async(req, res) => {
    try {

        const userId = req.params.userId;
        // ottengo l'istitutoId dal userId
        const { istitutoId } = await infoUser(userId);

        // Salvo una nuova materiaUser
        const newProfessore = await saveProfessore(istitutoId, req.body);

        res.status(newProfessore ? 200 : 404).json(newProfessore ? newProfessore : "newProfessore: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * ProfessoreUser: aggiungo un collegamento tra professore e materia (dell'utente)
 * @param {bigint} userId
 * @param {bigint} materiaId
 * @param {bigint} professoreId
 */
router.post('/new/:userId/:materiaId/:professoreId/', async(req, res) => {
    try {

        const userId = req.params.userId;
        const materiaId = req.params.materiaId;
        const professoreId = req.params.professoreId;

        // ottengo l'istitutoId dal userId
        const { istitutoId } = await infoUser(userId);

        // Salvo una nuova materiaUser
        const newProfessoreUser = await saveProfessoreUser(istitutoId, userId, materiaId, professoreId);

        res.status(newProfessoreUser ? 200 : 404).json(newProfessoreUser ? newProfessoreUser : "newProfessoreUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})



/**
 * Professore: lista di ricevimento rispetto ad un professore
 * @param {bigint} professoreId
 */
router.get('/:professoreId/ricevimento/', async(req, res) => {
    try {
        const professoreId = req.params.professoreId;

        // Salvo una nuova materiaUser
        const newMateriaUser = await SaveMateriaUser(userId, istitutoId, req.body);

        res.status(newMateriaUser ? 200 : 404).json(newMateriaUser ? newMateriaUser : "newMateriaUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * MateriaUser: collego la materia allo UserId -> inserimento di una nuova MateriaUser nel db 
 * @param {bigint} userId
 */
router.post('/:professoreId/ricevimento/new/', async(req, res) => {
    try {

        const professoreId = req.params.professoreId;

        // Salvo una nuova materiaUser
        const newMateriaUser = await SaveMateriaUser(userId, istitutoId, req.body);

        res.status(newMateriaUser ? 200 : 404).json(newMateriaUser ? newMateriaUser : "newMateriaUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})


module.exports = router;