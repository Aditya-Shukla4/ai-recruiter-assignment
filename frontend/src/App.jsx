// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CandidateBuilder from "./pages/CandidateBuilder";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import { Briefcase, LayoutDashboard } from "lucide-react";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="font-bold text-xl tracking-tight text-blue-400">
              AI Recruiter<span className="text-white">Pro</span>
            </div>
            <div className="flex gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors font-medium"
              >
                <Briefcase size={18} />
                <span>Candidate View</span>
              </Link>
              <Link
                to="/recruiter"
                className="flex items-center gap-2 hover:text-purple-400 transition-colors font-medium"
              >
                <LayoutDashboard size={18} />
                <span>Recruiter View</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CandidateBuilder />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
