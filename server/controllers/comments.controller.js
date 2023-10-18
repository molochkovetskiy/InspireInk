const {
    _createComment,
} = require('../models/comments.model.js')

const createComment = async (req, res) => {
    const { userId, answerId, text } = req.body;

    try {
        const data = await _createComment(userId, answerId, text);
        res.json(data);
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: err.message });
    }
};

module.exports = {
    createComment,
};