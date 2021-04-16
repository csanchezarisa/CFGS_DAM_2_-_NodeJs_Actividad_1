const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('cliente')
});
router.post('/login', (req, res) => {
    let dni = req.body.dni;
    let pwd = req.body.pwd;

    if (dni === '12345678A' && pwd === 'user1234') {
        res.redirect('/');
    }
    else {
        res.render('cliente', {
            error: true
        });
    }
});

module.exports = router;