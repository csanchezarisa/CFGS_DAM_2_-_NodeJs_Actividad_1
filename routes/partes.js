const express = require('express');
const formidable = require('formidable');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('partes');
});
router.post('/', (req, res) => {
    
    let form = new formidable.IncomingForm();

    form.parse(req);

    let updatedCorrectly = false;

    form.on('fileBegin', (name, file) => {

        let fileNameParts = file.name.split('.');
        let extension = fileNameParts[fileNameParts.length - 1];

        if (extension.toUpperCase() === 'PDF') {
            file.name = Math.random().toString(36).substr(2) + ".pdf";
            file.path = './files/' + file.name;
            updatedCorrectly = true;
        }

        res.render('partes', {
            updatedCorrectly: updatedCorrectly
        });
    });
});

module.exports = router;