const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const { User, validate } = require('../models/user'); 

const getUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
}

const addUser = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });

    if (user) {
        res.status(400).send('User already registered');
    } else {
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        user = await user.save();

        const token = user.generateAuthToken()
    
        res.header('x-auth-token', token).send(_.pick(user, ['name', 'email', 'password']));
    }
}

exports.getUser = getUser;
exports.addUser = addUser;
