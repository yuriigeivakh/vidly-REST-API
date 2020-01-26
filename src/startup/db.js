const mongoose = require('mongoose');
const config = require('config');

console.log(config.get('db'))

module.exports = function() {
  mongoose.connect(config.get('db'));
}