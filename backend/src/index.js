// backend/src/index.js
const connectDB = require("./config/db");
connectDB();

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { extractProfileData } = require("./services/llmService");

const app = express();
app.use(cors());
app.use(express.json());

// Test route to check if AI is working
app.post("/api/ai/parse", async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "Bhai, input toh bhej!" });
  }

  try {
    const structuredData = await extractProfileData(userInput);
    res.json({ success: true, data: structuredData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.lang(`Server is running in high gear on port ${PORT} 🔥`);
});
