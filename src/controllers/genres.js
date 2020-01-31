const mongoose = require('mongoose');

const { Genre, validate } = require('../models/genre');

const getGenres = async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres)
}

const addGenre = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre(req.body);

    genre.save((err, doc) => {
        if (err) return res.json(err);
        res.status(200).json({
            post: true,
            genreId: doc._id
        })
    }) 
}

const updateGenre = async (req, res) => {
    Genre.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
          success: true,
          doc
        })
    })
}

const getGenreById = async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
}

const deleteGenre = async (req, res) => {
    let id = req.body.id;

    Genre.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true);
    })
}

exports.getGenres = getGenres;
exports.addGenre = addGenre;
exports.updateGenre = updateGenre;
exports.getGenreById = getGenreById;
exports.deleteGenre = deleteGenre;