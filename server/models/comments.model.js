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

const _getCommentsForAnswer = (answerId) => {
    return db('comments')
        .select('comments.text', 'comments.created_at', 'users.username')
        .join('users', 'comments.user_id', 'users.id')
        .where({ 'comments.answer_id': answerId });
};

module.exports = {
    _createComment,
    _getCommentsForAnswer,
};