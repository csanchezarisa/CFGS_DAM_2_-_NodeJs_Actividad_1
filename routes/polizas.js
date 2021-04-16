const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    let polizas = [
        'P1234',
        'P4321',
        'P5678',
        'P8765'
    ];

    res.render('polizas', {
        polizas: polizas
    });
});
router.get('/([P]{1}[0-9]):poliza', (req, res) => {
    res.render('poliza', {
        poliza: req.params.poliza
    });
});

module.exports = router;