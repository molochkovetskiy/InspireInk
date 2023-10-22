const express = require('express');
const path = require('path');
const app = express();

const cookieParser = require('cookie-parser');

const { prompts_router } = require('./routes/prompts.router.js');
const { users_router } = require('./routes/users.router.js');
const { comments_router } = require('./routes/commnets.router.js');
const { ai_router } = require('./routes/ai.router.js');

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from a .env file

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use('/prompts', prompts_router);
app.use('/users', users_router);
app.use('/comments', comments_router);
app.use('/ai', ai_router);

// Error handling for invalid routes
app.use((req, res) => {
    res.status(404).json({ msg: 'Route not found' });
});

// Define the port number from environment variables or use a default value (5000)
const PORT = process.env.PORT || 5000;

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(path.resolve(__dirname, '..'), "client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(path.resolve(__dirname, '..'), "./client/build", "index.html"));
});