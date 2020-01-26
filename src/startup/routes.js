const express = require('express');
const bodyParser = require('body-parser');

// const error = require('../middleware/error');
const genres = require('../api/genres');
const movies = require('../api/movies');
const rentals = require('../api/rentals');
const users = require('../api/users');
const auth = require('../api/auth');
const customers = require('../api/customers');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use('/api/movies', movies)
  app.use('/api/genres', genres)
  app.use('/api/rentals', rentals)
  app.use('/api/customers', customers)
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  // app.use(error);
}