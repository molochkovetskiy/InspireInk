const express = require('express');
const {
    register,
    login,
    recordAnswer,
    getUserAnswers,
} = require('../controllers/users.controller.js');
const { verifyToken } = require('../middlewares/verify.token.js');

const users_router = express.Router();

users_router.post('/register', register);
users_router.post('/login', login);
users_router.get('/verify', verifyToken, (req, res) => {
    res.sendStatus(200);
});
users_router.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.user = null;
    res.sendStatus(200);
})

users_router.post('/record-answer', recordAnswer);
users_router.get('/user-answers/:id', getUserAnswers);

module.exports = { users_router };