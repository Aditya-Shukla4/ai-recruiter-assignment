// frontend/src/pages/CandidateBuilder.jsx
import React, { useState } from "react";
import { generateProfile } from "../services/api";
import { Loader2, Send } from "lucide-react";
import ProfilePreviewCard from "../components/ProfilePreviewCard";

const CandidateBuilder = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const handleBuildProfile = async () => {
    if (!inputText.trim()) {
      alert("Bhai, thoda apne baare mein toh likh!");
      return;
    }

    setLoading(true);
    try {
      const result = await generateProfile(inputText);
      if (result.success) {
        setProfileData(result.profile);
      }
    } catch (error) {
      alert("Server phat gaya ya AI thak gaya. Console check kar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-2 text-blue-400">
        AI Profile Builder ✨
      </h1>
      <p className="text-slate-400 mb-6">
        Traditional resumes are dead. Tell me about your experience, skills, and
        projects, and I'll structure it for you.
      </p>

      {/* Input Area */}
      <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
        <textarea
          className="w-full bg-slate-900 text-white p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="5"
          placeholder="E.g., I have 2 years of experience in React and Node.js. I built a fitness app..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleBuildProfile}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {loading ? "AI is Thinking..." : "Build My Profile"}
          </button>
        </div>
      </div>

      {/* Raw Data Display (Iska sundar UI apan baad mein banayenge) */}
      {/* Elegant UI Display */}
      {profileData && (
        <div className="mt-8">
          <p className="text-green-400 font-bold mb-4 text-center">
            ✅ Profile Auto-Saved & Synced!
          </p>
          <ProfilePreviewCard profileData={profileData} />
        </div>
      )}
    </div>
  );
};

export default CandidateBuilder;
