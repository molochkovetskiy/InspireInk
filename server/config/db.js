const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'tai.db.elephantsql.com',
        port: process.env.DB_PORT || '5432',
        user: process.env.DB_USER || 'aacjyzez',
        password: process.env.DB_PASSWORD || 'MR6tfQMlXAy3W1aQK1oLbx2fMnUUt3O2',
        database: process.env.DB_NAME || 'aacjyzez',
    },
});

module.exports = { db };