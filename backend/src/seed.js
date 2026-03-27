// backend/src/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seedDemoUser = async () => {
  try {
    // Pehle check kar lo agar existing hai toh uda do
    await User.deleteOne({ email: "hire-me@anshumat.org" });

    const demoUser = await User.create({
      email: "hire-me@anshumat.org",
      password: "HireMe@2025!", // Model automatically isko hash kar dega
    });

    console.log("✅ Demo User Seeded Successfully, Bhai!");
    process.exit();
  } catch (error) {
    console.error("❌ Error Seeding Data:", error);
    process.exit(1);
  }
};

seedDemoUser();
