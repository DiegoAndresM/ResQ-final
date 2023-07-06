const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Mixed = mongoose.Schema.Types.Mixed;

const { Schema } = mongoose;

const workersSchema = new Schema({
  username: String,
  email: String,
  password: String,
  bloodtype: Mixed,
  age: Number,
  weight: Mixed,
  height: Mixed,
  status: Boolean
});

workersSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

workersSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('workers', workersSchema); 