const express = require('express');

const { auth } = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

const genresControllers = require('../controllers/genres');

router.get('/', genresControllers.getGenres);

router.post('/add_genre', auth, genresControllers.addGenre)

router.post('/update_genre', auth, genresControllers.updateGenre)

router.delete('/delete_genre', [auth, admin], genresControllers.deleteGenre)

router.get('/:id', genresControllers.getGenreById);

module.exports = router;