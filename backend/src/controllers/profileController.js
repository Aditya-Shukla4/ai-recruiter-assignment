// backend/src/controllers/profileController.js
const { extractProfileData } = require("../services/llmService");
const CandidateProfile = require("../models/CandidateProfile");
const User = require("../models/User");

// 1. Function to Build & Save Profile (Jo tune galti se uda diya tha)
const buildProfileWithAI = async (req, res) => {
  const { userInput, userEmail } = req.body;

  if (!userInput) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Bhai, kuch text toh bhej parse karne ke liye!",
      });
  }

  try {
    console.log("🤖 Llama 3 dimaag laga raha hai...");
    const aiData = await extractProfileData(userInput);

    const user = await User.findOne({
      email: userEmail || "hire-me@anshumat.org",
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User nahi mila bhai!" });
    }

    const profile = await CandidateProfile.findOneAndUpdate(
      { user: user._id },
      {
        user: user._id,
        skills: aiData.skills || [],
        experience: aiData.experience || [],
        projects: aiData.projects || [],
        summary: aiData.summary || "",
        lastSavedAt: Date.now(),
      },
      { new: true, upsert: true },
    );

    console.log("✅ Profile Database mein save ho gayi!");
    res
      .status(200)
      .json({ success: true, message: "AI ne profile bana di!", profile });
  } catch (error) {
    console.error("🔥 Profile Controller Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Kuch toh phat gaya server pe." });
  }
};

// 2. Function to Get All Profiles (Recruiter Dashboard ke liye)
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await CandidateProfile.find()
      .populate("user", "email")
      .sort({ lastSavedAt: -1 });

    res.status(200).json({ success: true, profiles });
  } catch (error) {
    console.error("🔥 Error fetching profiles:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Profiles laane mein server phat gaya.",
      });
  }
};

// Dono functions ko export kar diya!
module.exports = { buildProfileWithAI, getAllProfiles };
