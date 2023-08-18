const mongoose = require('mongoose');

const { Schema } = mongoose;

const cordSchema = new Schema({
    Rname: String,
    location: {
      x: Number,
      y: Number
    },
  });
  
  module.exports = mongoose.model('cords', cordSchema); 
  