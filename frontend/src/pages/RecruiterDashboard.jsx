// frontend/src/pages/RecruiterDashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchAllProfiles } from "../services/api";
import { motion } from "framer-motion";
import { Loader2, Users, ExternalLink } from "lucide-react";

const RecruiterDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const data = await fetchAllProfiles();
        if (data.success) {
          setProfiles(data.profiles);
        }
      } catch (error) {
        console.error("Failed to load profiles bhai:", error);
      } finally {
        setLoading(false);
      }
    };
    getProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
        <Users size={32} className="text-purple-400" />
        <h1 className="text-3xl font-bold text-white">Recruiter Dashboard</h1>
      </div>

      {profiles.length === 0 ? (
        <p className="text-slate-400 text-center mt-20 text-lg">
          Koi candidate nahi mila bhai. Pehle profile build karwao!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors flex flex-col h-full shadow-lg"
            >
              <div className="mb-4">
                <span className="text-xs font-semibold bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                  {profile.user?.email || "hire-me@anshumat.org"}
                </span>
              </div>

              <p className="text-slate-300 text-sm mb-4 line-clamp-3 flex-grow">
                {profile.summary || "No summary available."}
              </p>

              <div className="mb-4">
                <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  Top Skills
                </h4>
                <div className="flex flex-wrap gap-1">
                  {profile.skills?.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills?.length > 3 && (
                    <span className="text-xs text-slate-500 py-1">
                      +{profile.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <button className="w-full mt-auto flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition-colors text-sm font-semibold">
                <span>View Full Profile</span>
                <ExternalLink size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
