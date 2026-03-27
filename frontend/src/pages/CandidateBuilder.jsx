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
    // System font, dark zinc theme
    <div className="max-w-4xl mx-auto p-8 mt-10 font-sans text-zinc-100 selection:bg-emerald-500/30">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-zinc-100">
          AI Profile Builder ✨
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Traditional resumes are dead. Tell me about your experience, skills,
          and projects, and I will structure it for you.
        </p>
      </div>

      {/* Input Area - Borderless, shadow and background driven */}
      <div className="bg-zinc-900/50 p-6 rounded-3xl shadow-xl">
        <textarea
          className="w-full bg-zinc-950 text-zinc-100 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none font-mono text-sm placeholder:text-zinc-600 shadow-inner"
          rows="6"
          placeholder="E.g., I have 2 years of experience in React and Node.js. I built a fitness app..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleBuildProfile}
            disabled={loading}
            // Minimal emerald button, black text for high contrast
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {loading ? "Processing Data..." : "Build My Profile"}
          </button>
        </div>
      </div>

      {/* Elegant UI Display */}
      {profileData && (
        <div className="mt-12">
          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-emerald-400 font-mono text-sm font-semibold tracking-widest uppercase">
              Profile Auto-Saved & Synced
            </p>
          </div>
          <ProfilePreviewCard profileData={profileData} />
        </div>
      )}
    </div>
  );
};

export default CandidateBuilder;
