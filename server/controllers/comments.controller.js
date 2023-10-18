const {
    _createComment,
    _getCommentsForAnswer,
} = require('../models/comments.model.js')

const createComment = async (req, res) => {
    const { answerId } = req.params;
    const { userId, text } = req.body;

    try {
        const data = await _createComment(userId, answerId, text);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
};

const getCommentsForAnswer = async (req, res) => {
    const { answerId } = req.params;
    try {
        const data = await _getCommentsForAnswer(answerId);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(404).json({ msg: 'Comments not found' });
    }
};

module.exports = {
    createComment,
    getCommentsForAnswer,
};