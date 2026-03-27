// backend/src/controllers/profileController.js ke andar add kar:

const getAllProfiles = async (req, res) => {
  try {
    // Populate use kar rahe hain taaki Profile ke sath User ka email bhi aa jaye
    const profiles = await CandidateProfile.find()
      .populate("user", "email")
      .sort({ lastSavedAt: -1 }); // Latest sabse upar

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

// Ab export mein naya function bhi daal de:
module.exports = { buildProfileWithAI, getAllProfiles };
