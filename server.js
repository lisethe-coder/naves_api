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
var Nave = require('./models/nave');

// puerto del servidor
// podra ser seteado como argumento en comando
var port = process.env.PORT || 3200;

// RUTAS de la API
var router = express.Router();

// Middleware 
router.use(function(req, res, next) {
    console.log('Request a la API.');
    next(); // llamamos a la función next para continuar
});

// ruta para probar nuestro servidor
router.get('/', function(req, res){
	res.json({message: 'Ándale, arriba arriba, yepa yepa'});
});

// Rutas basicas
router.route('/naves')
	.post(function(req, res){ // Ruta POST
		var nave = new Nave();		
		nave.nombre = req.body.nombre;
		nave.categoria = req.body.categoria;
		nave.motores = req.body.motores;
		nave.peso = req.body.peso;
		
		nave.save(function(err){
			if(err) res.send(err);
			res.send({message:'Nave creada con exito'});
		});
	})
	.get(function(req, res){ // Ruta GET
		Nave.find(function(err, naves) {
            if (err) res.send(err);
            res.json(naves);
        });
	});

// Rutas para Nave específica
router.route('/naves/:id')
    .get(function(req, res) { // GET por Id
        Nave.findById(req.params.id, function(err, nave) {
            if (err)res.send(err);
            res.json(nave);
        });
    })
	// actualizar Nave con Id
    .put(function(req, res) {
        Nave.findById(req.params.id, function(err, nave) {
            if (err) res.send(err);

            nave.nombre = req.body.nombre;
			nave.categoria = req.body.categoria;
			nave.motores = req.body.motores;
			nave.peso = req.body.peso;

            // Guardamos la Nave
            nave.save(function(err) {
                if (err) res.send(err);
                res.json({message:'Nave actualizada!'});
            });
        });
    })
	// eliminar Nave con Id
	.delete(function(req, res) {
        Nave.remove({
            _id: req.params.id
        }, function(err, nave) {
            if (err) res.send(err);
            res.json({message:'Nave eliminada con exito'});
        });
    });

// Registrar las rutas con prefijo /api
app.use('/api', router);

// Iniciar servidor
app.listen(port);
console.log('La magia esta en el puerto ' + port);