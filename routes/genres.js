const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { Genre } = require('../models/genre');

// GET

router.get('/get_genres', (req, res) => {
  Genre.find().exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc)
  })
})

// POST

router.post('/add_genre', (req, res) => {
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

router.post('/update_genre', (req, res) => {
  Genre.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    })
  })
})

// DELETE

router.delete('/delete_genre', (req, res) => {
  let id = req.body.id;

  Genre.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  })
})

module.exports = router;