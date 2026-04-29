import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Network from "./pages/Network";
import SessionPage from "./pages/SessionPage";

import VerifySkillModal from "./components/VerifySkillModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Helper function to handle opening the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleLoginSuccess = () => setIsLoggedIn(true);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      {isLoggedIn && <Navbar onVerify={openModal} />}

      <main className={isLoggedIn ? "container mx-auto px-4 pt-20 pb-10" : ""}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard onVerify={openModal} /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/network" element={<Network />} />
          <Route path="/sessions" element={<SessionPage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Modal - Rendered at the end of the DOM for better stacking context */}
      {isModalOpen && <VerifySkillModal onClose={closeModal} />}
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-center">
        <p className="text-slate-400 text-lg font-semibold">Page not found</p>
        <p className="text-slate-300 text-sm">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}