const express = require("express");

const {
    getAiAdvice,
} = require('../controllers/ai.controller.js');

const ai_router = express.Router();

ai_router.post("/get-ai-advice", getAiAdvice);

module.exports = { ai_router };