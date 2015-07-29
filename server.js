// server.js - Tutorial Noderos.com

// paquetes necesarios

var express = require('express');
var app = express(); // Instancia del servidor express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://noderos:noderos10@apollo.modulusmongo.net:27017/yh6ovOge'); // conección a mongo

// Configurar app para usar bodyParser
// con este paquete obtendremos
// los datos enviados por POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Modelos
var Nave = require('./app/models/nave');

// puerto del servidor
// podra ser seteado como argumento en comando
var port = process.env.PORT || 3200;

// RUTAS de la API
var router = express.Router();

// ruta para probar nuestro servidor
router.get('/', function(req, res){
	res.json({message: 'Ándale, arriba arriba, yepa yepa'});
});

// Registrar las rutas con prefijo /api
app.use('/api', router);

// Iniciar servidor
app.listen(port);
console.log('La magia esta en el puerto ' + port);