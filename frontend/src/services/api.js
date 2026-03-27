// frontend/src/services/api.js
import axios from "axios";

// Backend ka address
const API = axios.create({
  baseURL: "https://ai-recruiter-assignment.onrender.com",
});

// Candidate ke liye: Profile Generate + Save
export const generateProfile = async (
  userInput,
  userEmail = "hire-me@anshumat.org",
) => {
  try {
    const response = await API.post("/profile/build", { userInput, userEmail });
    return response.data;
  } catch (error) {
    console.error("API Error Bhai:", error);
    throw error;
  }
};

// Recruiter ke liye: Saari profiles fetch karna
export const fetchAllProfiles = async () => {
  try {
    const response = await API.get("/profile/all");
    return response.data;
  } catch (error) {
    console.error("Dashboard API Error Bhai:", error);
    throw error;
  }
};
