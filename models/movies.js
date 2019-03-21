const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  genre: genreSchema,
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
})

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(5).required(),
    dailyRentalRate: Joi.number().min(5).required()
  }
}

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie; 
exports.validate = validateMovie;
