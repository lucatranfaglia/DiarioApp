const { Router } = require('express');
const router = Router();


const {
    savePagella,
    updatePagella,
    deletePagella,
    getPagella,
    getPagelle,
} = require('../../controllers/Pagella');

const {
    getMateriaVotiByUserId,
} = require('../../controllers/MateriaVoti');




async function parseInfoVoti(pagella) {
    // PARSE del dettaglio voti
    pagella.infoVoti = pagella.infoVoti.map(voti => {
        return JSON.parse(voti);
    });
    return pagella;
}

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

/**
 * PAGELLA - vengono selezionati tutti i voti di tutte le materia dell'utente e salvati in un array e inseriti in Pagella
 * @param {bigint} userId 
 * @returns {object}
 */
router.post('/analisi/:userId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        // Ottengo tutti i voti dell'utente senza data
        const listMateriaVotiByUserId = await getMateriaVotiByUserId(userId);


        // Dettaglio materie, raggruppate per materie  
        var dettaglio = listMateriaVotiByUserId.reduce((results, voto) => {
            (results[voto.nome] = results[voto.nome] || []).push(voto);

            return results;
        }, [])

        // ricorrenze delle Materie - per calcolare la media
        let votoRicMat = listMateriaVotiByUserId.reduce((acc, materia) => {
            if (acc === null) return {...acc, [materia.nome]: 1 };
            return {...acc, [materia.nome]: (acc[materia.nome] || 0) + 1 };
        }, null);

        // Media voti per ogni materie
        let votoMedia = listMateriaVotiByUserId.reduce((acc, next) => {
            // la prima volta inserisco nomeMateria: votoMateria  => curr = {Chimica: 5}
            if (acc === null) return {...acc, [next.nome]: next.voto };
            // dalla seconda volta, curr = curr.Chimica + next.voto => 5 + 4
            return {...acc, [next.nome]: (acc[next.nome] || 0) + next.voto };
        }, null)

        // mediaTotaleMaterie
        const infoVoti = [];
        for (const [key, value] of Object.entries(votoMedia)) {
            var obj = {};
            if (votoRicMat[key]) {
                obj['materia'] = key;
                obj['media'] = value / votoRicMat[key];
                if (dettaglio[key])
                    obj['dettaglio'] = dettaglio[key];
                // [{ Chimica: 4.5 }]
                infoVoti.push(obj);
            }
        }

        const resultSave = await savePagella(userId, infoVoti, req.body);



        res.status(resultSave ? 200 : 404).json(resultSave ? resultSave : "resultSave: not found!");
    } catch (error) {
        res.status(500).send(error.toString());
    }
})


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

/**
 * Pagella - lista di tutte le Pagelle dell'utente, tramite userId
 */
router.get('/pagelle/user/:userId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        let pagelle = await getPagelle(userId);


        const parsePagelle = pagelle.map(async pagella => {
            pagella.infoVoti = pagella.infoVoti.map(voti => {
                return JSON.parse(voti);
            });
            return pagella;
        });

        res.status(parsePagelle ? 200 : 404).json(parsePagelle ? parsePagelle : "parsePagelle: not found!");

    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * Pagella - visualizzazione di una pagella, tramite pagellaId
 */
router.get('/pagella/:pagellaId/', async(req, res) => {
    try {
        const pagellaId = req.params.pagellaId;

        const pagella = await getPagella(pagellaId);

        // PARSE del dettaglio voti
        const parsePagella = await parseInfoVoti(pagella);

        res.status(parsePagella ? 200 : 404).json(parsePagella ? parsePagella : "parsePagella: not found!");
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

/**
 * MateriaVoti - vengono selezionati tutti i voti di tutte le materia dell'utente e salvati in un array e inseriti in Pagella
 * @param {bigint} userId 
 * @returns {object}
 */
router.get('/user/:userId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        // Ottengo tutti i voti dell'utente senza 
        const listMateriaVotiByUserId = await getMateriaVotiByUserId(userId);
        res.status(listMateriaVotiByUserId ? 200 : 404).json(listMateriaVotiByUserId ? listMateriaVotiByUserId : listMateriaVotiByUserId);
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

/**
 * MateriaVoti - vengono visualizzati tutti i voti (media e dettaglio) di tutte le materia dell'utente 
 * @param {bigint} userId 
 * @returns {object}
 */
router.get('/pagella/user/:userId/', async(req, res) => {
    try {
        const userId = req.params.userId;
        // Ottengo tutti i voti dell'utente senza data
        const listMateriaVotiByUserId = await getMateriaVotiByUserId(userId);


        // Dettaglio materie, raggruppate per materie  
        var dettaglio = listMateriaVotiByUserId.reduce((results, voto) => {
            (results[voto.nome] = results[voto.nome] || []).push(voto);

            return results;
        }, [])

        // ricorrenze delle Materie - per calcolare la media
        let votoRicMat = listMateriaVotiByUserId.reduce((acc, materia) => {
            if (acc === null) return {...acc, [materia.nome]: 1 };
            return {...acc, [materia.nome]: (acc[materia.nome] || 0) + 1 };
        }, null);

        // Media voti per ogni materie
        let votoMedia = listMateriaVotiByUserId.reduce((acc, next) => {
            // la prima volta inserisco nomeMateria: votoMateria  => curr = {Chimica: 5}
            if (acc === null) return {...acc, [next.nome]: next.voto };
            // dalla seconda volta, curr = curr.Chimica + next.voto => 5 + 4
            return {...acc, [next.nome]: (acc[next.nome] || 0) + next.voto };
        }, null)

        // mediaTotaleMaterie
        let meterieTotali = [];
        for (const [key, value] of Object.entries(votoMedia)) {
            var obj = {};
            if (votoRicMat[key]) {
                obj['materia'] = key;
                obj['media'] = value / votoRicMat[key];
                if (dettaglio[key])
                    obj['dettaglio'] = dettaglio[key];
                // [{ Chimica: 4.5 }]
                meterieTotali.push(obj);
            }
        }
        res.status(meterieTotali ? 200 : 404).json(meterieTotali ? meterieTotali : meterieTotali);
    } catch (error) {
        res.status(500).send(error.toString());
    }
})
module.exports = router;