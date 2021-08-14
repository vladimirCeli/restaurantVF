const mongoose = require('mongoose');

const { Schema } = mongoose;

const pagoSchema = new Schema({
  
  id:{
    type: String,
    requered: true  
  }, 
  total:{
    type: Number,
    requered: true
  } , 
  estado: {
    type: Boolean,
    requered: true
  },
},{
  timestamps: true
});
module.exports = mongoose.model('pago', pagoSchema);