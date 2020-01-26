const express = require('express');

const rentalsControllers = require('../controllers/rentals');

const router = express.Router();

router.get('/', rentalsControllers.getRentals);

router.post('/', rentalsControllers.addRental);

router.get('/:id', rentalsControllers.getRentalById);

module.exports = router; 