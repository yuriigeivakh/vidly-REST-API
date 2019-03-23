const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const app = express();
const bodyParser = require('body-parser');

const config = require('config');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const customers = require('./routes/customers');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1)
}

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/vidly');

app.use(bodyParser.json());
app.use('/api', genres)
app.use('/api/movies', movies)
app.use('/api/movies', movies)
app.use('/api/genres', genres)
app.use('/api/rentals', rentals)
app.use('/api/customers', customers)
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log('Server is running');
})


