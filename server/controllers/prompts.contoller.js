const {
    _getAllPrompts,
    _searchPrompt,
    _getPromptById,
    _createPrompt,
    _updatePrompt,
    _deletePromt,
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

module.exports = {
    getAllPrompts,
    getPromptById,
    createPrompt,
    updatePrompt,
    deletePrompt,
    searchPrompt,
};