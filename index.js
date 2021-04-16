const express = require('express');
const app = express();
const polizas = require('./routes/polizas');
const partes = require('./routes/partes');
const clientes = require('./routes/clientes');

app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.use('/polizas', polizas);
app.use('/partes', partes);
app.use('/clientes', clientes);

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/presupuesto', (req, res) => {

    let terceros = calcularTerceros(req.body);
    let franquicia = terceros + 200;
    let todoRiesgo = terceros + 500;

    res.render('presupuesto', {
        terceros: terceros,
        franquicia: franquicia,
        todoRiesgo: todoRiesgo
    });
});
app.get('/info', (req, res) => {
    res.render('info')
});
app.all('*', (req, res) => {
    res.render('error');
});

function calcularTerceros(body) {
    var precio = body.potencia * 6;
    
    if (body.edad >= 28 && body.edad <= 50) {
        precio -= 100;
    }

    if (body.sexo === 'M') {
        precio -= 25;
    }

    if (body.anos > 25) {
        precio -= 200;
    }
    else if (body.anos > 10) {
        precio -= 100;
    }

    if (body.partes <= 1) {
        precio -= 50;
    }
    else if (body.partes <= 3) {
        precio -= 25;
    }

    if (body.kilometros < 25000) {
        precio -= 25;
    }

    if (body.garaje !== 'N') {
        precio -= 100;
    }

    return parseFloat(precio);
}

app.listen(3000);