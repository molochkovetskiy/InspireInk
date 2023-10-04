const { db } = require('../config/db.js');

const _getAllPrompts = () => {
    return db('prompts')
        .select('id', 'description', 'created_at', 'updated_at');
};

const _searchPrompt = async (description) => {
    const prompts = await db('prompts')
        .select('id', 'description', 'created_at', 'updated_at')
        .where('description', 'ilike', `%${description}%`);

    if (prompts.length === 0) {
        throw new Error('Prompt not found');
    }

    return prompts;
};

const _getPromptById = async (id) => {
    const prompt = await db('prompts')
        .select('id', 'description', 'created_at', 'updated_at')
        .where({ id })
        .first();

    if (!prompt) {
        throw new Error('Prompt not found');
    }

    return prompt;
};

const _createPrompt = ({ description }) => {
    return db('prompts')
        .insert({ description }, ['id', 'description', 'created_at', 'updated_at']);
};

const _updatePrompt = async ({ description }, id) => {
    const updatedPrompt = await db('prompts')
        .update({ description, updated_at: db.raw('CURRENT_TIMESTAMP') })
        .where({ id })
        .returning(['id', 'description', 'created_at', 'updated_at']);

    if (updatedPrompt.length === 0) {
        throw new Error('Prompt not found');
    }

    return updatedPrompt[0];
};

const _deletePromt = async (id) => {
    const deletedPrompt = await db('prompts')
        .where({ id })
        .del()
        .returning(['id', 'description', 'created_at', 'updated_at']);

    if (deletedPrompt.length === 0) {
        throw new Error('Prompt not found');
    }

    return deletedPrompt[0];
};

const _getFeedPrompts = () => {
    return db('user_answers')
        .select('prompts.description', 'user_answers.answer', 'users.username', 'user_answers.updated_at')
        .join('users', 'user_answers.user_id', 'users.id')
        .join('prompts', 'user_answers.prompt_id', 'prompts.id')
        .limit(10)
        .orderBy('user_answers.updated_at', 'desc');
};

module.exports = {
    _getAllPrompts,
    _getPromptById,
    _createPrompt,
    _updatePrompt,
    _deletePromt,
    _searchPrompt,
    _getFeedPrompts,
};