const express = require('express');
const {
    register,
    login,
    recordAnswer,
} = require('../controllers/users.controller.js');

const users_router = express.Router();

users_router.post('/register', register);
users_router.post('/login', login);
users_router.post('/record-answer', recordAnswer);

module.exports = { users_router };