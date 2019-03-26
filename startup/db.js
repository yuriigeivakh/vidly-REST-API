const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose
    .connect('mongodb://localhost:27017/vidly', {
      useMongoClient: true,
    })
    .then(() => console.log('connected to mongoDB'))
}