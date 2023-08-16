const mongoose = require('mongoose');


const { Schema } = mongoose;
  
 const pulseSchema = new Schema({
  pname: String,
  oxigen: Number,
  pulse: Number,
});
  
module.exports = mongoose.model('pulses', pulseSchema); 