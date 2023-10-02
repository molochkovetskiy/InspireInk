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

const _recordAnswer = (user_id, prompt_id, answer) => {
    return db('user_answers')
        .insert({ user_id, prompt_id, answer })
        .returning(['id', 'user_id', 'prompt_id', 'answer']);
};

module.exports = {
    _register,
    _login,
    _recordAnswer,
};