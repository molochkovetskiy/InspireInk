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

module.exports = {
    _register,
    _login,
};