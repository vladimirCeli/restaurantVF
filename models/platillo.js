const mongoose = require('mongoose');

const { Schema } = mongoose;

const platilloSchema = new Schema({
  
  nombre:{
    type: String,
    requered: true
  },
  descripcion:{
    type: String,
    requered: true
  } ,
  calificacion:{
    type: double,
    requered: true
  } ,
  imagen:{
    type: String,
    requered: true
  } ,
  precio: {
    type: double,
    requered: true
  },

},{
  timestamps: true

});
module.exports = mongoose.model('platillo', platilloSchema);