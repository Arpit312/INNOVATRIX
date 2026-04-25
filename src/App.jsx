import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Network from "./pages/Network";
import SessionPage from "./pages/SessionPage";
import LoginPage from "./pages/login";
import VerifySkillModal from "./components/VerifySkillModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to handle opening the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      <Navbar onVerify={openModal} />

      <main className="container mx-auto px-4 pt-20 pb-10">
        <Routes>
          <Route path="/" element={<Dashboard onVerify={openModal} />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/network" element={<Network />} />
          <Route path="/sessions" element={<SessionPage />} />
          <Route path="/login" element={<LoginPage />} />
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