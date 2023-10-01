const express = require('express');

const {
    getAllPrompts,
    createPrompt,
} = require('../controllers/prompts.contoller.js');

const prompts_router = express.Router();

prompts_router.get('/', getAllPrompts);
prompts_router.post('/', createPrompt);

module.exports = { prompts_router };