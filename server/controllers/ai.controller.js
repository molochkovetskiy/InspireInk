require("dotenv").config();
const axios = require('axios');

const getAiAdvice = async (req, res) => {
    try {
        const { prompt, answer } = req.body;
        const apiKey = process.env.OPEN_AI_KEY;
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: `
                prompt: ${prompt}
                answer: ${answer}
                Please provide advice on how I can improve my response to the prompt.
                I am looking for suggestions to enhance clarity, coherence, and overall effectiveness of my answer.
                Your guidance should be detailed and insightful, containing no less than 200 characters.
              `,
            max_tokens: 500,
            temperature: 0.7,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        });
    }
};

module.exports = {
    getAiAdvice,
};
