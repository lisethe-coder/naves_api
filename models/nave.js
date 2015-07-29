var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NaveSchema   = new Schema({
    nombre: String,
	categoria: String,
	motores: Number,
	peso: Number
});

module.exports = mongoose.model('Nave', NaveSchema);