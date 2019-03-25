const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { auth } = require('../middleware/auth');
const admin = require('../middleware/admin');

const { Genre } = require('../models/genre');

// GET

router.get('/get_genres', (req, res) => {
  Genre.find().exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc)
  })
})

// POST

router.post('/', auth, async (req, res) => {
  let genre = new Genre({ genre: req.body.genre });
  genre = await genre.save()

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

module.exports = router;