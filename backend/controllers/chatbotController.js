const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // Important for Groq!
});

// Chatbot logic
const chatbotController = async (req, res) => {
  const { message } = req.body;
  console.log("Chatbot endpoint hit, message:", message);

  try {
    const response = await openai.chat.completions.create({
      model: "llama3-8b-8192", // Use "llama3-70b-8192" for more power
      messages: [
        {
          role: "system",
          content: `
You are XportConnect Assistant – a smart, friendly, and helpful chatbot designed to assist users (exporters, buyers, and shippers) on the XportConnect platform.
- Help with product listings, orders, shippers
- Guide users through the platform
- Never guess answers; escalate if unsure
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content;
    res.json({ reply });
  } catch (error) {
    console.error("Groq chatbot error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from chatbot" });
  }
};

module.exports = { chatbotController };
