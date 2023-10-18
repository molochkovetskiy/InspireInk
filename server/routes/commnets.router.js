const express = require('express');

const {
    createComment,
} = require('../controllers/comments.controller.js');

const comments_router = express.Router();

comments_router.post('/add-comment', createComment);

module.exports = { comments_router };