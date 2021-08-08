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
    type: Number,
    requered: true
  } ,
  imagen:{
    type: String,
    requered: true
  } ,
  precio: {
    type: Number,
    requered: true
  },
  url: {
    type: String,
    requered: true
  },
  estado: {
    type: Boolean,
    requered: true
  },

},{
  timestamps: true

});
module.exports = mongoose.model('platillo', platilloSchema);