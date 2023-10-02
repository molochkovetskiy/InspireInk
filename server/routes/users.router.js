const express = require('express');
const {
    register,
    login,
} = require('../controllers/users.controller.js');

const users_router = express.Router();

users_router.post('/register', register);
users_router.post('/login', login);

module.exports = { users_router };