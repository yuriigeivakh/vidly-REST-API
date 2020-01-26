const express = require('express');

const moviesControllers = require('../controllers/movies');

const router = express.Router();

router.get('/', moviesControllers.getMovie)

router.post('/add_movie', moviesControllers.addMovie)

router.post('/update_movie', moviesControllers.updateMovie)

router.delete('/delete_movie', moviesControllers.deleteMovie)

module.exports = router;