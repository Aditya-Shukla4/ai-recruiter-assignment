// backend/src/index.js
// 1. SABSE PEHLE ENV LOAD KARO!
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// 2. AB DATABASE CONNECT KARO (Kyunki ab MONGO_URI mil jayega)
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 3. APNE ASLI ROUTES YAHAN LAGAO
// Jo route frontend use karega dashboard aur profile banane ke liye
app.use("/api/profile", require("./routes/profileRoutes"));

// (Optional) Tera test route rakhna hai toh rakh le
app.post("/api/ai/parse", async (req, res) => {
  const { extractProfileData } = require("./services/llmService");
  const { userInput } = req.body;
  if (!userInput)
    return res.status(400).json({ error: "Bhai, input toh bhej!" });

  try {
    const structuredData = await extractProfileData(userInput);
    res.json({ success: true, data: structuredData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in high gear on port ${PORT} 🔥`);
});
