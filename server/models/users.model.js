const { db } = require('../config/db.js');

const _register = (username, password) => {
    return db('users')
        .insert({ username, password })
        .returning(['id', 'username', 'password']);
};

const _login = (username) => {
    return db('users')
        .select('id', 'username', 'password')
        .where({ username });
};

const _recordAnswer = (userId, promptId, answer) => {
    return db('user_answers')
        .insert({
            user_id: userId,
            prompt_id: promptId,
            answer,
        })
        .returning(['id', 'user_id', 'prompt_id', 'answer']);
};

const _getUserAnswers = (userId) => {
    return db('user_answers')
        .select('id', 'user_id', 'prompt_id', 'answer')
        .where({ user_id: userId });
}

module.exports = {
    _register,
    _login,
    _recordAnswer,
    _getUserAnswers,
};