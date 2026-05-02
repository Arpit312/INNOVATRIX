import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronRight, Search, Upload, Users, X, Sparkles } from "lucide-react";
import { SKILL_OPTIONS } from "../data/Dummydata";
import { cn } from "../lib/utils";

const STEPS = [{ id: 1, label: "Skill" }, { id: 2, label: "Evidence" }, { id: 3, label: "Reviewers" }];
const MOCK_PEERS = [
  { name: "Priya S.", role: "Senior Engineer", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=priya" },
  { name: "Rajan K.", role: "ML Researcher", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=rajan" },
  { name: "Sia T.", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=sia" },
  { name: "Dev M.", role: "Data Scientist", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=dev" },
];

export default function VerifySkillModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [evidence, setEvidence] = useState({});
  const [selectedPeers, setSelectedPeers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const canNext = (step === 1 && selectedSkill) || (step === 2 && (evidence.files?.length || evidence.link)) || (step === 3 && selectedPeers.length > 0);
  const handleNext = () => { if (step < 3) setStep((c) => c + 1); else setSubmitted(true); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="premium-card relative w-full max-w-2xl overflow-hidden"
        style={{ boxShadow: "0 0 80px rgba(0,245,255,0.08), 0 40px 120px rgba(0,0,0,0.6)" }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.6), rgba(124,58,237,0.5), transparent)" }} />
        <div className="scan-sweep" />
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/8 text-cyan-300"><Users size={17} /></div>
            <div>
              <p className="eyebrow mb-0.5">Proof Workflow</p>
              <h2 className="text-lg font-black text-white">Verify a Skill</h2>
            </div>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:text-white" aria-label="Close"><X size={17} /></button>
        </div>
        <div className="max-h-[78vh] overflow-y-auto px-5 py-6 sm:px-6">
          {submitted ? <SuccessView onClose={onClose} /> : (
            <>
              <StepIndicator current={step} />
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
                  {step === 1 && <Step1 selected={selectedSkill} setSelected={setSelectedSkill} />}
                  {step === 2 && <Step2 skill={selectedSkill} evidence={evidence} setEvidence={setEvidence} />}
                  {step === 3 && <Step3 selectedPeers={selectedPeers} setSelectedPeers={setSelectedPeers} />}
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5">
                <button type="button" onClick={() => step > 1 ? setStep((c) => c - 1) : onClose()} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-slate-400 transition hover:bg-white/5 hover:text-white">
                  {step > 1 && <ArrowLeft size={14} />}{step === 1 ? "Cancel" : "Back"}
                </button>
                <button type="button" onClick={handleNext} disabled={!canNext} className="button-primary disabled:cursor-not-allowed disabled:opacity-50">
                  {step === 3 ? "Submit Request" : "Continue"}<ChevronRight size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StepIndicator({ current }) {
  return (
    <div className="mb-8 grid grid-cols-3 gap-2">
      {STEPS.map((step) => (
        <div key={step.id} className={cn("flex items-center gap-2.5 rounded-2xl border px-3 py-3 transition", step.id <= current ? "border-cyan-400/25 bg-cyan-400/8" : "border-white/8 bg-white/4")}>
          <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-black", step.id < current ? "bg-emerald-400 text-slate-950" : step.id === current ? "text-slate-950" : "bg-white/8 text-slate-500")} style={step.id === current ? { background: "linear-gradient(135deg, #00c8ff, #7c3aed)" } : {}}>
            {step.id < current ? <CheckCircle2 size={15} /> : step.id}
          </span>
          <span className={cn("hidden text-xs font-black uppercase tracking-wider sm:block", step.id <= current ? "text-cyan-300" : "text-slate-500")}>{step.label}</span>
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
      <h3 className="text-xl font-black text-white">Which skill should be verified?</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">Choose a skill that has project, assessment, or peer evidence behind it.</p>
      <div className="relative mt-5">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Search skills..." value={query} onChange={(e) => setQuery(e.target.value)} className="field pl-11" />
      </div>
      <div className="mt-4 grid max-h-72 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
        {filtered.map((skill) => (
          <button key={skill} type="button" onClick={() => setSelected(skill)} className={cn("flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-bold transition", selected === skill ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300" : "border-white/8 bg-white/4 text-slate-300 hover:bg-white/7")}>
            {skill}{selected === skill && <CheckCircle2 size={15} className="text-cyan-300" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ skill, evidence, setEvidence }) {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const setFiles = (files) => setEvidence((c) => ({ ...c, files: Array.from(files) }));
  return (
    <div>
      <h3 className="text-xl font-black text-white">Upload evidence for {skill}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">Attach proof files or a verifiable project link.</p>
      <button type="button" onClick={() => fileRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); setFiles(e.dataTransfer.files); }} className={cn("mt-5 w-full rounded-2xl border-2 border-dashed p-8 text-center transition", dragOver ? "border-cyan-400/50 bg-cyan-400/8" : "border-white/10 bg-white/4 hover:bg-white/6")}>
        <Upload className="mx-auto text-cyan-400" size={26} />
        <p className="mt-3 text-sm font-black text-white">Drop files or browse</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">PDF, PNG, JPG up to 10MB</p>
        {evidence.files?.length > 0 && <p className="mt-3 text-xs font-black text-emerald-300">{evidence.files.length} file(s) selected</p>}
      </button>
      <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" multiple onChange={(e) => setFiles(e.target.files)} className="sr-only" />
      <label className="mt-5 block">
        <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Verifiable Link</span>
        <input type="url" placeholder="https://github.com/yourproject" value={evidence.link || ""} onChange={(e) => setEvidence((c) => ({ ...c, link: e.target.value }))} className="field" />
      </label>
      <label className="mt-4 block">
        <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Notes</span>
        <textarea rows={3} placeholder="Briefly describe what this evidence proves..." value={evidence.notes || ""} onChange={(e) => setEvidence((c) => ({ ...c, notes: e.target.value }))} className="field resize-none" />
      </label>
    </div>
  );
}

function Step3({ selectedPeers, setSelectedPeers }) {
  const toggle = (name) => setSelectedPeers((c) => c.includes(name) ? c.filter((i) => i !== name) : [...c, name]);
  return (
    <div>
      <h3 className="text-xl font-black text-white">Request peer review</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">Select reviewers who can validate the evidence with context.</p>
      <div className="mt-5 grid gap-2">
        {MOCK_PEERS.map((peer) => {
          const sel = selectedPeers.includes(peer.name);
          return (
            <button key={peer.name} type="button" onClick={() => toggle(peer.name)} className={cn("flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition", sel ? "border-cyan-400/30 bg-cyan-400/8" : "border-white/8 bg-white/4 hover:bg-white/7")}>
              <img src={peer.avatar} alt={peer.name} className="h-10 w-10 rounded-xl bg-slate-800" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black text-white">{peer.name}</span>
                <span className="block text-xs text-slate-500">{peer.role}</span>
              </span>
              {sel && <CheckCircle2 size={17} className="text-cyan-300" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SuccessView({ onClose }) {
  return (
    <div className="py-10 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-emerald-400/20 bg-emerald-400/8 text-emerald-300" style={{ boxShadow: "0 0 30px rgba(52,211,153,0.2)" }}>
        <CheckCircle2 size={34} />
      </motion.div>
      <h3 className="text-2xl font-black text-white">Verification Submitted</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-400">Your selected peer reviewers have been notified. The request is now visible in your trust workflow.</p>
      <button type="button" onClick={onClose} className="button-primary mt-7"><Sparkles size={15} />Back to Dashboard</button>
    </div>
  );
}
