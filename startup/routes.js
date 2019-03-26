const express = require('express');
const bodyParser = require('body-parser');

const error = require('../middleware/error');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const customers = require('../routes/customers');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use('/api', genres)
  app.use('/api/movies', movies)
  app.use('/api/movies', movies)
  app.use('/api/genres', genres)
  app.use('/api/rentals', rentals)
  app.use('/api/customers', customers)
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}