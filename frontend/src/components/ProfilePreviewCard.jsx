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

  // Simple print function for Export as PDF feature
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl print:bg-white print:text-black print:shadow-none print:border-none"
    >
      {/* Header & Export Button */}
      <div className="flex justify-between items-start mb-8 border-b border-slate-700 pb-6 print:border-gray-300">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500/20 p-4 rounded-full print:bg-blue-100">
            <UserCircle
              size={40}
              className="text-blue-400 print:text-blue-600"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white print:text-gray-900">
              AI Generated Profile
            </h2>
            <p className="text-slate-400 mt-1 max-w-2xl print:text-gray-600">
              {profileData.summary}
            </p>
          </div>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors print:hidden"
        >
          <Download size={16} />
          <span>Export PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Skills */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4 text-blue-400 print:text-blue-600">
            <Code size={20} />
            <h3 className="text-lg font-semibold text-white print:text-gray-900">
              Top Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profileData.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-3 py-1 rounded-full text-sm print:bg-gray-100 print:text-gray-800 print:border-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Experience & Projects */}
        <div className="col-span-1 md:col-span-2 space-y-8">
          {/* Experience Section */}
          {profileData.experience?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4 text-purple-400 print:text-purple-600">
                <Briefcase size={20} />
                <h3 className="text-lg font-semibold text-white print:text-gray-900">
                  Experience
                </h3>
              </div>
              <div className="space-y-4">
                {profileData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 print:bg-white print:border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-200 print:text-black">
                          {exp.role}
                        </h4>
                        <p className="text-sm text-slate-400 print:text-gray-600">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-slate-500 bg-slate-800 px-2 py-1 rounded print:bg-gray-100">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 mt-2 print:text-gray-700">
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
              <div className="flex items-center gap-2 mb-4 text-green-400 print:text-green-600">
                <FolderGit2 size={20} />
                <h3 className="text-lg font-semibold text-white print:text-gray-900">
                  Key Projects
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileData.projects.map((proj, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 print:bg-white print:border-gray-200"
                  >
                    <h4 className="font-bold text-slate-200 mb-2 print:text-black">
                      {proj.title}
                    </h4>
                    <p className="text-sm text-slate-400 mb-4 print:text-gray-700 line-clamp-2">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {proj.techStack?.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded print:bg-gray-100 print:text-gray-600"
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
