const express = require('express');

const authControllers = require('../controllers/auth');

const router = express.Router();

router.post('/', authControllers.authenticate);

module.exports = router;
