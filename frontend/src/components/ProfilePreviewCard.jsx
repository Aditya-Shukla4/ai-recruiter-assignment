// frontend/src/components/ProfilePreviewCard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code,
  FolderGit2,
  Download,
  UserCircle,
} from "lucide-react";

const ProfilePreviewCard = ({ profileData }) => {
  if (!profileData) return null;

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // No borders, solid deep background with soft shadow
      className="bg-zinc-900 rounded-3xl p-10 shadow-2xl print:bg-white print:text-black print:shadow-none"
    >
      {/* Header & Export Button */}
      <div className="flex justify-between items-start mb-10 pb-8 border-b border-zinc-800/50 print:border-gray-300">
        <div className="flex items-center gap-6">
          <div className="bg-zinc-800 p-5 rounded-full print:bg-gray-100">
            <UserCircle
              size={48}
              className="text-zinc-300 print:text-gray-800"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-100 print:text-gray-900">
              Verified Profile
            </h2>
            <p className="text-zinc-400 mt-2 max-w-2xl leading-relaxed print:text-gray-600">
              {profileData.summary}
            </p>
          </div>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-5 py-2.5 rounded-xl transition-colors font-medium text-sm print:hidden"
        >
          <Download size={16} />
          <span>Export PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column: Skills */}
        <div className="col-span-1">
          <div className="flex items-center gap-3 mb-6 text-zinc-300 print:text-gray-800">
            <Code size={22} />
            <h3 className="text-lg font-bold tracking-wide uppercase text-zinc-100 print:text-gray-900">
              Core Stack
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profileData.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-zinc-950 text-emerald-400 px-3.5 py-1.5 rounded-lg text-sm font-mono print:bg-gray-100 print:text-gray-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Experience & Projects */}
        <div className="col-span-1 md:col-span-2 space-y-10">
          {/* Experience Section */}
          {profileData.experience?.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6 text-zinc-300 print:text-gray-800">
                <Briefcase size={22} />
                <h3 className="text-lg font-bold tracking-wide uppercase text-zinc-100 print:text-gray-900">
                  Experience
                </h3>
              </div>
              <div className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  // Deep background creates natural borderless separation
                  <div
                    key={index}
                    className="bg-zinc-950 p-6 rounded-2xl print:bg-white print:border print:border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-zinc-100 print:text-black">
                          {exp.role}
                        </h4>
                        <p className="text-sm font-medium text-emerald-500 mt-1 print:text-gray-600">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md print:bg-gray-100">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mt-3 print:text-gray-700">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {profileData.projects?.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6 text-zinc-300 print:text-gray-800">
                <FolderGit2 size={22} />
                <h3 className="text-lg font-bold tracking-wide uppercase text-zinc-100 print:text-gray-900">
                  Key Projects
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {profileData.projects.map((proj, index) => (
                  <div
                    key={index}
                    className="bg-zinc-950 p-6 rounded-2xl flex flex-col h-full print:bg-white print:border print:border-gray-200"
                  >
                    <h4 className="font-bold text-lg text-zinc-100 mb-2 print:text-black">
                      {proj.title}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6 print:text-gray-700 flex-grow">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {proj.techStack?.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2.5 py-1 rounded-md print:bg-gray-100 print:text-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePreviewCard;
