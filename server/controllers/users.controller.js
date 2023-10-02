const {
    _register,
    _login,
    _recordAnswer,
    _getUserAnswers,
} = require('../models/users.model.js');

const bcrypt = require('bcrypt');
require('dotenv').config();

const register = async (req, res) => {
    const { username, password } = req.body;

    const lower_username = username.toLowerCase();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password + '', salt);

    try {
        const row = await _register(lower_username, hash);
        res.json(row);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'username already exists' });
    }
};

const login = async (req, res) => {
    try {
        const row = await _login(req.body.username.toLowerCase());
        // username
        if (row.length === 0)
            return res.status(404).json({ msg: 'username not found' });
        // password
        const match = await bcrypt.compare(req.body.password + '', row[0].password);
        if (!match)
            return res.status(404).json({ msg: 'wrong password' });
        // successful login
        const userId = row[0].id;
        const username = row[0].username
        // // my secret
        // const secret = process.env.ACCESS_TOKEN_SECRET;
        // // token
        // const accessToken = jwt.sign({ userId, username }, secret, {
        //     expiresIn: '60s',
        // });
        // // server cookies
        // res.cookie('token', accessToken, {
        //     httpOnly: true,
        //     maxAge: 60 * 1000,
        // });
        // // response with token
        // res.json({ token: accessToken });
        res.json({ id: userId, username });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'something went wrong' });
    }
};

const recordAnswer = async (req, res) => {
    const { userId, promptId, answer } = req.body;

    try {
        const userAnswer = await _recordAnswer(userId, promptId, answer);
        res.status(201).json(userAnswer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getUserAnswers = async (req, res) => {
    const userId = req.params.id;

    try {
        const userAnswers = await _getUserAnswers(userId);
        res.status(200).json(userAnswers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

module.exports = {
    register,
    login,
    recordAnswer,
    getUserAnswers,
};