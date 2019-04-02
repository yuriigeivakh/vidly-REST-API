const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const validateObjectId = require('../middleware/validateObjectId');
const asyncMiddleware = require('../middleware/async');
const { auth } = require('../middleware/auth');
const admin = require('../middleware/admin');

const { Genre, validate } = require('../models/genre');

// GET

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres)
});

// POST

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
})

router.post('/add_genre', auth, async (req, res) => {
  const genre = new Genre(req.body);
  console.log(req.body);

  genre.save((err, doc) => {
    if (err) return res.json(err);
    res.status(200).json({
      post: true,
      genreId: doc._id
    })
  }) 
})

// UPDATE

router.post('/update_genre', auth, async (req, res) => {
  Genre.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    })
  })
})

// DELETE

router.delete('/delete_genre', [auth, admin], async (req, res) => {
  let id = req.body.id;

  Genre.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  })
})

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;