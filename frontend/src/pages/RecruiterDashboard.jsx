// frontend/src/pages/RecruiterDashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchAllProfiles } from "../services/api";
import { motion } from "framer-motion";
import { Loader2, Users, ArrowUpRight, Search } from "lucide-react";

const RecruiterDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Real-time Stealth Filter Logic
  const filteredProfiles = profiles.filter((profile) => {
    const query = searchQuery.toLowerCase();
    const matchSkill = profile.skills?.some((skill) =>
      skill.toLowerCase().includes(query),
    );
    const matchSummary = profile.summary?.toLowerCase().includes(query);
    const matchEmail = profile.user?.email?.toLowerCase().includes(query);

    return matchSkill || matchSummary || matchEmail;
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="animate-spin text-zinc-400 w-10 h-10" />
      </div>
    );
  }

  return (
    // System font, pure dark zinc background
    <div className="max-w-7xl mx-auto p-8 mt-4 font-sans text-zinc-100 selection:bg-emerald-500/30">
      {/* Header section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-zinc-800/50 p-3 rounded-2xl shadow-sm">
          <Users size={28} className="text-zinc-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Talent Pool
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Showing all AI-verified candidates.
          </p>
        </div>
      </div>

      {/* The Premium Search Bar */}
      <div className="mb-12 relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search by React, Python, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 text-zinc-100 pl-14 pr-16 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono text-sm placeholder:text-zinc-600 shadow-lg shadow-zinc-950/50"
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-zinc-500 bg-zinc-800 px-2.5 py-1 rounded-md">
            ⌘K
          </span>
        </div>
      </div>

      {filteredProfiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24">
          <p className="text-zinc-500 text-lg">
            Koi result nahi mila bhai. Try another keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfiles.map((profile, index) => (
            <motion.div
              key={profile._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-zinc-900 hover:bg-zinc-800/80 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-mono font-medium bg-zinc-800 text-emerald-400 px-3 py-1.5 rounded-full">
                  {profile.user?.email || "verified_candidate"}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-zinc-600 group-hover:text-zinc-300 transition-colors"
                />
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow">
                {profile.summary ||
                  "No summary provided. System requires more data."}
              </p>

              <div className="mt-auto">
                <h4 className="text-xs font-semibold text-zinc-600 mb-3 uppercase tracking-widest">
                  Core Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="bg-zinc-800/50 text-zinc-300 text-xs px-3 py-1.5 rounded-lg font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills?.length > 3 && (
                    <span className="text-xs text-zinc-500 py-1.5 px-1 font-mono">
                      +{profile.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
