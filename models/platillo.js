const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  
  email: String,
  password: String,
  name:String,
  lastname: String,
  rol: int,

});
module.exports = mongoose.model('user', userSchema);