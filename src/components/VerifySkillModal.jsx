import { useState } from "react";
import { X, ChevronRight, CheckCircle, Upload, Users, Search } from "lucide-react";
import { SKILL_OPTIONS } from "../data/dummyData";

const STEPS = [
  { id: 1, label: "Select Skill" },
  { id: 2, label: "Upload Evidence" },
  { id: 3, label: "Request Review" },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step.id < current
                  ? "bg-indigo-600 text-white"
                  : step.id === current
                  ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {step.id < current ? <CheckCircle size={14} /> : step.id}
            </div>
            <span className={`text-[10px] font-semibold whitespace-nowrap ${step.id === current ? "text-indigo-700" : "text-slate-400"}`}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-12 h-px mb-5 ${step.id < current ? "bg-indigo-400" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1({ selected, setSelected }) {
  const [query, setQuery] = useState("");
  const filtered = SKILL_OPTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h3 className="text-base font-bold text-slate-800 mb-1">Which skill do you want to verify?</h3>
      <p className="text-sm text-slate-400 mb-4">Select from the list or search for a skill.</p>
      <div className="relative mb-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
        />
      </div>
      <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
        {filtered.map((skill) => (
          <button
            key={skill}
            onClick={() => setSelected(skill)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
              selected === skill
                ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            <span className="flex items-center justify-between">
              {skill}
              {selected === skill && <CheckCircle size={14} className="text-indigo-600" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ skill, evidence, setEvidence }) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div>
      <h3 className="text-base font-bold text-slate-800 mb-1">Upload Evidence for "{skill}"</h3>
      <p className="text-sm text-slate-400 mb-4">Certificates, project links, or test results are accepted.</p>

      {/* File Drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const files = Array.from(e.dataTransfer.files);
          setEvidence((prev) => ({ ...prev, files }));
        }}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all mb-4 ${
          dragOver ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-slate-50"
        }`}
      >
        <Upload size={24} className="mx-auto mb-2 text-slate-300" />
        <p className="text-sm font-semibold text-slate-600">Drag & drop files here</p>
        <p className="text-xs text-slate-400 mt-1">PDF, PNG, JPG up to 10MB</p>
        {evidence.files?.length > 0 && (
          <p className="text-xs text-indigo-600 mt-2 font-semibold">
            ✓ {evidence.files.length} file(s) selected
          </p>
        )}
      </div>

      {/* Link input */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Or paste a verifiable link</label>
        <input
          type="url"
          placeholder="https://github.com/yourproject"
          value={evidence.link || ""}
          onChange={(e) => setEvidence((prev) => ({ ...prev, link: e.target.value }))}
          className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
        />
      </div>

      <div className="mt-4">
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Notes (optional)</label>
        <textarea
          rows={3}
          placeholder="Briefly describe how this evidence demonstrates your skill..."
          value={evidence.notes || ""}
          onChange={(e) => setEvidence((prev) => ({ ...prev, notes: e.target.value }))}
          className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white resize-none"
        />
      </div>
    </div>
  );
}

const MOCK_PEERS = [
  { name: "Priya S.", role: "Senior Engineer", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=priya" },
  { name: "Rajan K.", role: "ML Researcher", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=rajan" },
  { name: "Sia T.", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=sia" },
  { name: "Dev M.", role: "Data Scientist", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=dev" },
];

function Step3({ selectedPeers, setSelectedPeers }) {
  const toggle = (name) =>
    setSelectedPeers((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  return (
    <div>
      <h3 className="text-base font-bold text-slate-800 mb-1">Request Peer Review</h3>
      <p className="text-sm text-slate-400 mb-4">Select colleagues who can validate your skill. We recommend 2–3 reviewers.</p>
      <div className="space-y-2">
        {MOCK_PEERS.map((peer) => {
          const selected = selectedPeers.includes(peer.name);
          return (
            <button
              key={peer.name}
              onClick={() => toggle(peer.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                selected ? "bg-indigo-50 border-indigo-300" : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              <img src={peer.avatar} alt={peer.name} className="w-9 h-9 rounded-full bg-slate-100" />
              <div className="flex-1">
                <p className={`text-sm font-semibold ${selected ? "text-indigo-700" : "text-slate-800"}`}>{peer.name}</p>
                <p className="text-xs text-slate-400">{peer.role}</p>
              </div>
              {selected && <CheckCircle size={16} className="text-indigo-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SuccessView({ onClose }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={32} className="text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">Verification Submitted!</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
        Your peer reviewers have been notified. You'll receive an update within 48 hours.
      </p>
      <button
        onClick={onClose}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default function VerifySkillModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [evidence, setEvidence] = useState({});
  const [selectedPeers, setSelectedPeers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const canNext =
    (step === 1 && selectedSkill) ||
    (step === 2 && (evidence.files?.length || evidence.link)) ||
    (step === 3 && selectedPeers.length > 0);

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
    else setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Users size={13} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 text-sm">Verify a Skill</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X size={15} className="text-slate-600" />
          </button>
        </div>

        <div className="px-6 py-6">
          {submitted ? (
            <SuccessView onClose={onClose} />
          ) : (
            <>
              <StepIndicator current={step} />
              {step === 1 && <Step1 selected={selectedSkill} setSelected={setSelectedSkill} />}
              {step === 2 && <Step2 skill={selectedSkill} evidence={evidence} setEvidence={setEvidence} />}
              {step === 3 && <Step3 selectedPeers={selectedPeers} setSelectedPeers={setSelectedPeers} />}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
                <button
                  onClick={() => (step > 1 ? setStep((s) => s - 1) : onClose())}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  {step === 1 ? "Cancel" : "← Back"}
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canNext}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  {step === 3 ? "Submit Request" : "Continue"}
                  <ChevronRight size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}