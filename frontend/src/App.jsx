// frontend/src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import CandidateBuilder from "./pages/CandidateBuilder";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import { Briefcase, LayoutDashboard } from "lucide-react";

// Custom component to handle active link styling minimalistically
const NavLink = ({ to, children, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 
        ${
          isActive
            ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/10"
            : "text-zinc-400 hover:text-zinc-100"
        }`}
    >
      <Icon size={18} />
      <span>{children}</span>
    </Link>
  );
};

function App() {
  return (
    <Router>
      {/* GLOBAL BACKGROUND CHANGED TO PURE ZINC-950 - NO MORE BLUE TINT */}
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col selection:bg-emerald-500/20">
        {/* Navigation Bar - Upgraded to Zinc-900, Borderless, Added subtle shadow */}
        <nav className="bg-zinc-900/80 backdrop-blur-md p-4 sticky top-0 z-50 shadow-xl shadow-zinc-950/20">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="font-extrabold text-2xl tracking-tighter text-zinc-100 flex items-center gap-1">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500"></span>
              <span>aiRecruiter</span>
            </div>
            <div className="flex gap-2">
              <NavLink to="/" icon={Briefcase}>
                Candidate View
              </NavLink>
              <NavLink to="/recruiter" icon={LayoutDashboard}>
                Recruiter View
              </NavLink>
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

        {/* Minimal Footer */}
        <footer className="py-6 text-center text-xs text-zinc-700 font-mono tracking-wider">
          AIRecruiterPro.v1 // No Border No Purple No Inter
        </footer>
      </div>
    </Router>
  );
}

export default App;
