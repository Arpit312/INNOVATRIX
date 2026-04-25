import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import VerifySkillModal from "./components/VerifySkillModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  // Helper function to handle opening the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onVerify={openModal} 
      />

      <main className="container mx-auto px-4 pt-20 pb-10">
        {activePage === "dashboard" ? (
          <Dashboard onVerify={openModal} />
        ) : (
          <div className="flex h-64 items-center justify-center text-slate-400">
            Page not found.
          </div>
        )}
      </main>

      {/* Modal - Rendered at the end of the DOM for better stacking context */}
      {isModalOpen && <VerifySkillModal onClose={closeModal} />}
    </div>
  );
}