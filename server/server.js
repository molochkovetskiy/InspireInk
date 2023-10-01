const express = require('express');
const app = express();
const { prompts_router } = require('./routes/prompts.router');

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from a .env file

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/prompts', prompts_router);

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