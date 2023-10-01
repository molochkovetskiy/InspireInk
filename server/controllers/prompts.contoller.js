const {
    _getAllPrompts,
    _createPrompt,
} = require('../models/prompts.model.js')

const getAllPrompts = (req, res) => {
    _getAllPrompts()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ msg: 'Not found' })
        });
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

module.exports = {
    getAllPrompts,
    createPrompt,
};