/* importar express */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const configs = require('./config');

// DotenV
require('dotenv').config({path: 'variables.env'});

// Comprobar que servidor y BD funcione correctamente
// db.authenticate().then(() => console.log('DB Conectada')).catch(error => console.log(error));

/* configurar express */
const app = express();

// Habilitar pug 
app.set('view engine', 'pug');

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

//cargar una carpeta estatica llamada public 
app.use(express.static('public'));

//validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')]; //env es una variable en Node para denotar ambiente en el que nos encontramos

//creamos variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra el año actual y genera la ruta
app.use((req, res, next) => {
    //crear nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();   
    res.locals.ruta = req.path;
    return next();
});

// Ejecutamos Body-parser
app.use(bodyParser.urlencoded({extended: true}));

/** Cargar rutas */
app.use('/', routes());

console.log('BD Conectada con exito :D')

/** Puerto y HOST para la app */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});