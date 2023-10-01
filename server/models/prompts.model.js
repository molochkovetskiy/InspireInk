const { db } = require('../config/db.js');

const _getAllPrompts = () => {
    return db('prompts')
        .select('id', 'description', 'created_at', 'updated_at');
};

const _createPrompt = ({ description }) => {
    return db('prompts')
        .insert({ description }, ['id', 'description', 'created_at', 'updated_at']);
};

module.exports = {
    _getAllPrompts,
    _createPrompt,
};