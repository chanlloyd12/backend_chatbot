const axios = require('axios');
require('dotenv').config();

// Use the exact key from your working HTML file here to test
// If this works, then your .env file is the problem.
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBez3EU2FYxRCewsyhXJYyIAMj3I3koZsc';

// Use this exact string
const MODEL_NAME = 'gemini-2.5-flash-preview-09-2025'; 

async function chatWithGemini(message) {
    try {
        // Construct the URL exactly like the successful HTML fetch call
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

        const payload = {
            contents: [{
                parts: [{ text: message }]
            }]
        };

        const response = await axios.post(API_URL, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.data.candidates && response.data.candidates[0].content) {
            return response.data.candidates[0].content.parts[0].text;
        } else {
            return "AI responded but the format was unexpected.";
        }
    } catch (error) {
        // This will print the EXACT reason Google is saying 404
        console.error("DEBUG GOOGLE ERROR:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        throw new Error("Chatbot is currently offline.");
    }
}

module.exports = { chatWithGemini };