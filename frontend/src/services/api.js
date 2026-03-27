// frontend/src/services/api.js
import axios from "axios";

// Backend ka address
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const generateProfile = async (
  userInput,
  userEmail = "hire-me@anshumat.org",
) => {
  try {
    // Ye wahi route hai jo humne backend mein banaya tha
    const response = await API.post("/profile/build", { userInput, userEmail });
    return response.data;
  } catch (error) {
    console.error("API Error Bhai:", error);
    throw error;
  }
};
