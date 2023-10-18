const { db } = require('../config/db.js');

const _createComment = (userId, answerId, text) => {
    return db('comments')
        .insert({
            user_id: userId,
            answer_id: answerId,
            text,
        })
        .returning(['id', 'user_id', 'answer_id', 'text', 'created_at']);
};

module.exports = {
    _createComment,
};