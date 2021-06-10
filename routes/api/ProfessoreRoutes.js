const { Router } = require('express');
const router = Router();

const { infoUser } = require('../../controllers/User');

const {
    getProfessori,
    saveProfessoreUser,
    saveProfessore,
    saveProfessoreRicevimento,

    updateProfessoreRicevimento,

    getProfessoreRicevimento,
    getProfessoriRicevimentoByUserId,
    getProfessoreRicevimentoById,

    getProfessoreRecensioni,
    saveProfessoreRecensione,
    updateProfessoreRecensione,

    getProfessoreRecensioneIdById

} = require('../../controllers/Professore');

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

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------


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

// ------------------------------------------------------------------------------------------------------------
// -------------------- RICEVIMENTO ---------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

/**
 * ProfessoreRicevimento: lista di ricevimento di tutti i prof. di un utente
 * @param {bigint} userId
 */
router.get('/:userId/ricevimenti/', async(req, res) => {
    try {
        const userId = req.params.userId;

        // Salvo una nuova materiaUser
        const listProfessoriRicevimentoByUserId = await getProfessoriRicevimentoByUserId(userId);

        res.status(listProfessoriRicevimentoByUserId ? 200 : 404).json(listProfessoriRicevimentoByUserId ? listProfessoriRicevimentoByUserId : "listProfessoriRicevimentoByUserId: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ------------------------------------------------------------------------------------------------------------

/**
 * ProfessoreRicevimento: lista di ricevimento rispetto ad UN professore
 * @param {bigint} professoreId
 */
router.get('/:professoreId/ricevimento/', async(req, res) => {
    try {
        const professoreId = req.params.professoreId;

        // Salvo una nuova materiaUser
        const listProfessoreRicevimento = await getProfessoreRicevimento(professoreId);

        res.status(listProfessoreRicevimento ? 200 : 404).json(listProfessoreRicevimento ? listProfessoreRicevimento : "listProfessoreRicevimento: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * ProfessoreRicevimento: aggiungo il ricevimento di un prof.
 * @param {bigint} userId
 */
router.post('/:professoreId/ricevimento/new/', async(req, res) => {
    try {
        const professoreId = req.params.professoreId;

        // Salvo una nuova ProfessoreRicevimento
        const newProfessoreRicevimento = await saveProfessoreRicevimento(professoreId, req.body);

        res.status(newProfessoreRicevimento ? 200 : 404).json(newProfessoreRicevimento ? newProfessoreRicevimento : "newProfessoreRicevimento: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ------------------------------------------------------------------------------------------------------------

/**
 * ProfessoreRicevimento: modifico il ricevimento del prof. tramite ricevimentoId
 * @param {bigint} ricevimentoId
 */
router.put('/:ricevimentoId/ricevimento/update/', async(req, res) => {
    try {
        const ricevimentoId = req.params.ricevimentoId;

        // Salvo una nuova ProfessoreRicevimento
        const result = await updateProfessoreRicevimento(ricevimentoId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getProfessoreRicevimentoById(ricevimentoId);

        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// -----------------------------------------------------------------------------------------------------------
// -------------------- RECENSIONE ---------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------

/**
 * Recensione: lista delle recensioni di UN professore
 * @param {bigint} professoreId
 */
router.get('/:professoreId/recensioni/', async(req, res) => {
    try {
        const professoreId = req.params.professoreId;

        // Salvo una nuova materiaUser
        const listProfessoreRecensioni = await getProfessoreRecensioni(professoreId);

        res.status(listProfessoreRecensioni ? 200 : 404).json(listProfessoreRecensioni ? listProfessoreRecensioni : "listProfessoreRecensioni: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})


/**
 * Recensione: aggiungo una nuova recensione di un prof.
 * @param {bigint} userId
 */
router.post('/:professoreId/recensione/new/', async(req, res) => {
    try {
        const professoreId = req.params.professoreId;

        // Salvo una nuova ProfessoreRicevimento
        const newProfessoreRecensione = await saveProfessoreRecensione(professoreId, req.body);

        res.status(newProfessoreRecensione ? 200 : 404).json(newProfessoreRecensione ? newProfessoreRecensione : "newProfessoreRecensione: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * Recensione: modifico la recensione del prof. tramite recensioneId
 * @param {bigint} recensioneId
 */
router.put('/:recensioneId/recensione/update/', async(req, res) => {
    try {
        const recensioneId = req.params.recensioneId;

        // Salvo una nuova ProfessoreRicevimento
        const result = await updateProfessoreRecensione(recensioneId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getProfessoreRecensioneIdById(recensioneId);

        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})
module.exports = router;