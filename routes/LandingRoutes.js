const { Router } = require('express');
const router = Router();
const path = require('path')

router.get('/react', async(req, res) => {
    try {

        res.render('index', { name: 'John' });

    } catch (error) {
        console.log("Error:", error);
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/');
    }
})

router.get('/', async(req, res) => {
    try {
        res.sendFile(path.join(__dirname + '/../views/index.html'));

    } catch (error) {
        console.log("Error:", error);
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/');
    }
})

module.exports = router;