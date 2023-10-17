const express = require('express');

const {
    getAllPrompts,
    searchPrompt,
    getPromptById,
    createPrompt,
    updatePrompt,
    deletePrompt,
    getFeedPrompts,
    insertLike,
    checkUserLikedAnswer,
    deleteLike,
    amountLikes,
} = require('../controllers/prompts.contoller.js');

const prompts_router = express.Router();

prompts_router.get('/', getAllPrompts);
prompts_router.get('/search', searchPrompt);
prompts_router.get('/feed', getFeedPrompts);
prompts_router.get('/check-like', checkUserLikedAnswer);
prompts_router.get('/amount-likes', amountLikes);
prompts_router.get('/:id', getPromptById);
prompts_router.post('/like', insertLike);
prompts_router.delete('/unlike', deleteLike);
prompts_router.post('/', createPrompt);
prompts_router.put('/:id', updatePrompt);
prompts_router.delete('/:id', deletePrompt);

module.exports = { prompts_router };