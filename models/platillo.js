const mongoose = require('mongoose');

const { Schema } = mongoose;

const platilloSchema = new Schema({
  
  nombre: String,
  descripcion: String,
  calificacion:double,
  imagen: String,
  precio: double,

});
module.exports = mongoose.model('platillo', platilloSchema);