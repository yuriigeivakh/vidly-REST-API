const express = require('express');

const { auth } = require('../middleware/auth');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/me', auth, usersControllers.getUser)

router.post('/', usersControllers.addUser);

module.exports = router; 