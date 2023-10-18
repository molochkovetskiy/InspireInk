const express = require('express');

const {
    createComment,
    getCommentsForAnswer,
} = require('../controllers/comments.controller.js');

const comments_router = express.Router();

comments_router.post('/:answerId', createComment);
comments_router.get('/:answerId', getCommentsForAnswer);

module.exports = { comments_router };