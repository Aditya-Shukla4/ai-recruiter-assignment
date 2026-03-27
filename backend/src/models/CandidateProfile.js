// backend/src/models/CandidateProfile.js
const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: [String],
    experience: [
      {
        role: String,
        company: String,
        duration: String,
        description: String,
      },
    ],
    projects: [
      {
        title: String,
        techStack: [String],
        description: String,
      },
    ],
    summary: String,
    lastSavedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("CandidateProfile", candidateProfileSchema);
