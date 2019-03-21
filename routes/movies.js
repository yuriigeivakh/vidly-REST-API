const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genre');

mongoose.Promise = global.Promise;

// GET

router.get('/get_movies', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
})

// POST

router.post('/add_movie', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  const genre = await Genre.findById(req.body.genreId)
  let movie = new Movie({
    title: req.body.title,
    genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();

  res.send(movie);
})

// UPDATE

router.post('/update_movie', (req, res) => {
  Movie.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    })
  })
})

// DELETE

router.delete('/delete_movie', (req, res) => {
  let id = req.body.id;

  Movie.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  })
})

module.exports = router;