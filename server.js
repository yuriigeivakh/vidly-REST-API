const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { Genre } = require('./models/genre');
const genres = require('./routes/genres');
const { Movie } = require('./models/movies');
const movies = require('./routes/movies');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/vidly');

app.use(bodyParser.json());
app.use('/api', genres)
app.use('/api/movies', movies)


const port = process.env.port || 3000;
app.listen(port, () => {
  console.log('Server is running');
})


