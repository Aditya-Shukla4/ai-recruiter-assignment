// backend/src/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const {
  buildProfileWithAI,
  getAllProfiles,
} = require("../controllers/profileController"); // getAllProfiles import kar

router.post("/build", buildProfileWithAI);
router.get("/all", getAllProfiles); // Yeh naya route daal diya

module.exports = router;
