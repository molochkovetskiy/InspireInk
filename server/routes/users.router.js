const express = require('express');
const {
    register,
    login,
    recordAnswer,
    getUserAnswers,
} = require('../controllers/users.controller.js');

const users_router = express.Router();

users_router.post('/register', register);
users_router.post('/login', login);
users_router.post('/record-answer', recordAnswer);
users_router.get('/user-answers/:id', getUserAnswers);

module.exports = { users_router };