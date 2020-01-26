const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genre');

const getMovie = async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
}

const addMovie = async (req, res, next) => {
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
}

const updateMovie = async (req, res, next) => {
    Movie.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
}

const deleteMovie = async (req, res, next) => {
    let id = req.body.id;

    Movie.findOneAndRemove({ _id: id }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true);
    })
}

exports.getMovie = getMovie;
exports.addMovie = addMovie;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;