const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log('Server is running');
})


