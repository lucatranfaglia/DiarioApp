const { Router } = require('express');
const router = Router();


const {
    saveSubmateriaParent,
    saveSubmateriaChild,

    updateSubmateriaParent,
    updateSubmateriaChild,
    deleteSubmateria

} = require('../../controllers/SubMateria');

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

/**
 * SubMateria - viene aggiunto un collegamento tra materiaUserIdParent e materiaUserIdChild, tramite materiaUserIdParent e materiaUserIdChild (inserisce l'utente dalla lista)
 * @param {bigint} materiaUserIdParent
 * @param {bigint} materiaUserIdChild
 */
router.post('/parent/:materiaUserIdParent/new/', async(req, res) => {
    try {
        const materiaUserIdParent = req.params.materiaUserIdParent;
        const newSubMateriaParent = await saveSubmateriaParent(materiaUserIdParent, req.body);
        res.status(newSubMateriaParent ? 200 : 404).json(newSubMateriaParent ? newSubMateriaParent : "newSubMateriaParent: not found!");
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * SubMateria - viene aggiunto un collegamento tra materiaUserIdChild e materiaUserIdParent, tramite materiaUserIdChild e materiaUserIdParent (inserisce l'utente dalla lista)
 * @param {bigint} materiaUserIdChild
 * @param {bigint} materiaUserIdParent
 */
router.post('/child/:materiaUserIdChild/new/', async(req, res) => {
    try {
        const materiaUserIdChild = req.params.materiaUserIdChild;
        const newSubMateriaChild = await saveSubmateriaChild(materiaUserIdChild, req.body);
        res.status(newSubMateriaChild ? 200 : 404).json(newSubMateriaChild ? newSubMateriaChild : "newSubMateriaChild: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

/**
 * SubMateria - Modifica il SubMateria della materia, tramite materiaUserIdParent e materiaUserIdChild (inserito da utente)
 * @param {bigint} materiaUserIdParent
 * @param {bigint} materiaUserIdChild
 */
router.put('/parent/:subMateriaIdParent/update/', async(req, res) => {
    try {
        const subMateriaId = req.params.subMateriaId;
        const result = await updateSubmateriaParent(subMateriaId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getSubMateria(subMateriaId);
        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * SubMateria - Modifica il SubMateria della materia, tramite materiaUserIdChild e materiaUserIdParent (inserito da utente)
 * @param {bigint} materiaUserIdChild
 * @param {bigint} materiaUserIdParent
 */
router.put('/child/:subMateriaIdChild/update/', async(req, res) => {
    try {
        const subMateriaId = req.params.subMateriaId;
        const result = await updateSubmateriaChild(subMateriaId, req.body);

        if (result[0] != 1) {
            res.status(404).json("Modifca non avvenuta con successo!");
        }

        // TODO: vedere logica
        const resultUpdate = await getSubMateria(subMateriaId);
        res.status(resultUpdate ? 200 : 404).json(resultUpdate ? resultUpdate : "resultUpdate: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

/**
 * SubMateria - Rimuovo il SubMateria dell'utente
 */
router.delete('/:subMateriaId/delete/', async(req, res) => {
    try {
        const subMateriaId = req.params.subMateriaId;
        const deleteResult = await deleteSubmateria(subMateriaId);
        res.status(deleteResult ? 200 : 404).json(deleteResult ? deleteResult : "deleteResult: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})


// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------





module.exports = router;