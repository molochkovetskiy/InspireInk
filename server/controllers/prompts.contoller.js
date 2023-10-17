const {
    _getAllPrompts,
    _searchPrompt,
    _getPromptById,
    _createPrompt,
    _updatePrompt,
    _deletePromt,
    _getFeedPrompts,
    _insertLike,
    _checkUserLikedAnswer,
    _deleteLike,
    _amountLikes,
} = require('../models/prompts.model.js')

const getAllPrompts = async (req, res) => {
    try {
        const data = await _getAllPrompts();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(404).json({ msg: 'Not found' });
    }
};

const searchPrompt = async (req, res) => {
    try {
        const description = req.query.description;
        const data = await _searchPrompt(description);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: err.message })
    }
};

const getPromptById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await _getPromptById(id);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: err.message })
    }
};

const createPrompt = async (req, res) => {
    try {
        const data = await _createPrompt(req.body);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: err.message });
    }
};

const updatePrompt = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _updatePrompt(req.body, id);
        res.json(data);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

const deletePrompt = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _deletePromt(id);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: err.message });
    }
};

const getFeedPrompts = async (req, res) => {
    try {
        const data = await _getFeedPrompts();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(404).json({ msg: 'Not found' });
    }
};

const insertLike = async (req, res) => {
    try {
        const { userId, userAnswerId } = req.body;

        const userHasLikedAnswer = await _checkUserLikedAnswer(userId, userAnswerId);

        if (!userHasLikedAnswer) {
            const data = await _insertLike(userId, userAnswerId);
            res.status(201).json(data);
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: err.message });
    }
};

const checkUserLikedAnswer = async (req, res) => {
    const { userId, userAnswerId } = req.query;
    try {
        const userHasLikedAnswer = await _checkUserLikedAnswer(userId, userAnswerId);
        res.json(userHasLikedAnswer);
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: err.message });
    }
};

const deleteLike = async (req, res) => {
    const { userId, userAnswerId } = req.query;
    try {
        const data = await _deleteLike(userId, userAnswerId);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: 'Answer not found' });
    }
};

const amountLikes = async (req, res) => {
    const { userAnswerId } = req.query;
    try {
        const data = await _amountLikes(userAnswerId);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: 'Like not found' });
    }
};

module.exports = {
    getAllPrompts,
    getPromptById,
    createPrompt,
    updatePrompt,
    deletePrompt,
    searchPrompt,
    getFeedPrompts,
    insertLike,
    checkUserLikedAnswer,
    deleteLike,
    amountLikes,
};