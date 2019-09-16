const mongoose = require('mongoose');
//simple schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const User = mongoose.model('User', UserSchema);

module.exports = User; 
