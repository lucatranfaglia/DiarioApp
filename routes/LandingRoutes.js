const { Router } = require('express');
const router = Router();


const { loginGoogle } = require('../repository/AuthGoogleRepository');

/**
 * Homepage
 */
router.get('/', async(req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.log("Error:", error);
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/');
    }
})

/**
 * Distruggo la sessione dalla pagina
 */
router.delete("/api/v1/auth/logout", async(req, res) => {
    req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})

module.exports = router;