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
};

const _getUserAnswer = (userId, promptId) => {
    return db('user_answers')
        .select('id', 'user_id', 'prompt_id', 'answer')
        .where({ user_id: userId, prompt_id: promptId });
};

const _getInfoUserAnswer = (userAnswerId) => {
    return db('user_answers')
        .select('user_answers.id', 'user_answers.answer', 'user_answers.updated_at', 'prompts.description', 'users.username')
        .join('users', 'user_answers.user_id', 'users.id')
        .join('prompts', 'user_answers.prompt_id', 'prompts.id')
        .where({ 'user_answers.id': userAnswerId });
};

module.exports = {
    _register,
    _login,
    _recordAnswer,
    _getUserAnswers,
    _getUserAnswer,
    _getInfoUserAnswer,
};