const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 150
  }      
}));

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;