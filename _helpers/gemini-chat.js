const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

async function chat(req, res, next) {
    try {
        const { message } = req.body;
        // Use the function defined in your chatbot.service.js
        const reply = await chatbotService.chatWithGemini(message);
        res.json({ reply });
    } catch (err) {
        next(err);
    }
}

module.exports = { getChatResponse };