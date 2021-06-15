const { Router } = require('express');
const router = Router();

const { infoUser } = require('../../controllers/User');

const {
    saveProfessoreUser,
    saveProfessore,
    getProfessori,
    getProfessoriDetails,
    getProfessoreDetails,

    // -------------------------------
    getProfessoreUser,
    getProfessoreUserDetails,

    getProfessoreUserByUserId,
    getProfessoreUserByUserIdDetails,

    // -------------------------------
    saveProfessoreRicevimento,
    updateProfessoreRicevimento,
    getProfessoreRicevimento,
    getProfessoriRicevimentoByUserId,
    getProfessoreRicevimentoById,

    // -------------------------------
    saveProfessoreRecensione,
    updateProfessoreRecensione,
    getProfessoreRecensioni,
    getProfessoreRecensioneIdById

} = require('../../controllers/Professore');


// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// --------------------- PROFESSORE ---------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
/**
 * Professore: aggiungo un nuovo professore nel db (tramite UserId)
 * @param {bigint} istitutoId
 */
router.post('/istituto/:istitutoId/new/', async(req, res) => {
    try {

        const istitutoId = req.params.istitutoId;

        // Salvo una nuova materiaUser
        const newProfessore = await saveProfessore(istitutoId, req.body);

        res.status(newProfessore ? 200 : 404).json(newProfessore ? newProfessore : "newProfessore: not found!")

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


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
 * Professore: lista dei professori
 * @param {bigint} userId
 */
router.get('/professori/details/', async(req, res) => {
    try {

        // lista dei professori nel dettaglio
        const listProfessori = await getProfessoriDetails();

        res.status(listProfessori ? 200 : 404).json(listProfessori ? listProfessori : "listProfessori: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * Professore: lista di uno professore nel dettagio
 * @param {bigint} professoreId
 */
router.get('/professore/:professoreId/details/', async(req, res) => {
    try {

        const professoreId = req.params.professoreId;
        // lista dei professori
        const listProfessoreDetails = await getProfessoreDetails(professoreId);

        res.status(listProfessoreDetails[0] ? 200 : 404).json(listProfessoreDetails[0] ? listProfessoreDetails[0] : "listProfessoreDetails: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------ PROFESSORE USER -------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

/**
 * ProfessoreUser: aggiungo un collegamento tra professore e materia (dell'utente)
 * @param {bigint} userId
 * @param {bigint} materiaId
 * @param {bigint} professoreId
 */
router.post('/user/:userId/materia/:materiaUserId/professore/:professoreId/new/', async(req, res) => {
    try {

        const userId = req.params.userId;
        const materiaUserId = req.params.materiaUserId;
        const professoreId = req.params.professoreId;

        // ottengo l'istitutoId dal userId
        const { istitutoId } = await infoUser(userId);

        // Salvo una nuova materiaUser
        const newProfessoreUser = await saveProfessoreUser(istitutoId, userId, materiaUserId, professoreId);

        res.status(newProfessoreUser ? 200 : 404).json(newProfessoreUser ? newProfessoreUser : "newProfessoreUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * ProfessoreUser: lista di uno professore nel dettagio
 * @param {bigint} professoreId
 */
router.get('/professoreUser/:professoreUserId/details/', async(req, res) => {
    try {

        const professoreUserId = req.params.professoreUserId;
        // lista dei professori
        const listProfessoreUserDetails = await getProfessoreUserDetails(professoreUserId);

        res.status(listProfessoreUserDetails[0] ? 200 : 404).json(listProfessoreUserDetails[0] ? listProfessoreUserDetails[0] : "listProfessoreUserDetails: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

/**
 * ProfessoreUser: lista di uno professore nel dettagio
 * @param {bigint} professoreId
 */
router.get('/professoreUser/:professoreUserId/', async(req, res) => {
    try {

        const professoreUserId = req.params.professoreUserId;
        // lista dei professori
        const listProfessoreUser = await getProfessoreUser(professoreUserId);

        res.status(listProfessoreUser[0] ? 200 : 404).json(listProfessoreUser[0] ? listProfessoreUser[0] : "listProfessoreUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
});


/**
 * ProfessoreUser: lista dei professori dell'utente nel dettagio
 * @param {bigint} userId
 */
router.get('/user/:userId/details/', async(req, res) => {
    try {

        const userId = req.params.userId;
        // lista dei professori
        const listProfessoreUserDetails = await getProfessoreUserByUserIdDetails(userId);

        res.status(listProfessoreUserDetails ? 200 : 404).json(listProfessoreUserDetails ? listProfessoreUserDetails : "listProfessoreUserDetails: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

/**
 * ProfessoreUser: lista dei professori dell'utente
 * @param {bigint} userId
 */
router.get('/user/:userId/', async(req, res) => {
    try {

        const userId = req.params.userId;
        // lista dei professori
        const listProfessoreUser = await getProfessoreUserByUserId(userId);

        res.status(listProfessoreUser ? 200 : 404).json(listProfessoreUser ? listProfessoreUser : "listProfessoreUser: not found!")
    } catch (error) {
        res.status(500).send(error.toString());
    }
});





// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------- PROFESSORE RICEVIMENTO -----------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
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



// ------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------
// -------------------- PROFESSORE RECENSIONE ----------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
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