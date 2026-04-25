import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Shield, Key, Mail, Sparkles } from "lucide-react";

const INTRO_STEPS = [
  "Secure your AI talent portfolio.",
  "Validate skill proofs with confidence.",
  "Access your dashboard in seconds.",
];

const FEATURES = [
  { title: "Smart onboarding", description: "A fast, friendly login flow with clear visual guidance." },
  { title: "Trust-first security", description: "Encrypted credentials and secure form interaction." },
  { title: "Ready for growth", description: "Designed to scale with your proof validation workspace." },
];

export default function LoginPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/");
    }, 700);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_45%)]" />
      <div className="pointer-events-none absolute right-[-120px] top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-float-pulse" />
      <div className="pointer-events-none absolute left-[-100px] bottom-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-float-pulse" />

      {showIntro ? (
        <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
          <div className="relative z-10 mx-auto w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div className="space-y-6 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200 shadow-sm shadow-indigo-500/10">
                  <Sparkles size={18} />
                  A modern introduction to ProofStack AI
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Welcome</p>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Build trust with secure skills verification.
                  </h1>
                  <p className="mt-6 max-w-xl text-slate-300 leading-8">
                    Start with a quick summary of how your workspace can help learners, peers, and employers validate verified skills. Then move into the login flow with a clean animated transition.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {INTRO_STEPS.map((step, idx) => (
                    <div key={idx} className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-5 text-sm text-slate-300 shadow-[0_18px_60px_rgba(15,23,42,0.25)]">
                      <p className="font-semibold text-white">Step {idx + 1}</p>
                      <p className="mt-2 leading-7">{step}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowIntro(false)}
                  className="inline-flex items-center gap-3 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:bg-indigo-400"
                >
                  Continue to login
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 animate-slide-in-right">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(168,85,247,0.18),_transparent_45%)]" />
                <div className="relative space-y-5">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Why this matters</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">A secure login welcomes every collaborator.</h2>
                    <p className="mt-3 text-slate-300 leading-7">
                      Your team can start from the onboarding screen, then authenticate instantly into the dashboard with confidence and motion-led guidance.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {FEATURES.map((feature) => (
                      <div key={feature.title} className="rounded-3xl bg-slate-900/90 p-5 text-sm text-slate-200 border border-slate-700/80">
                        <p className="font-semibold text-white">{feature.title}</p>
                        <p className="mt-2 text-slate-400 leading-6">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
          <div className="relative z-10 mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/95 shadow-[0_35px_120px_rgba(15,23,42,0.55)] backdrop-blur-xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
              <div className="bg-slate-950/60 p-8 sm:p-10">
                <div className="mb-8 space-y-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Secure sign in</p>
                  <h1 className="text-3xl font-semibold text-white sm:text-4xl">Log in to your proof validation workspace.</h1>
                  <p className="text-slate-400 leading-7">
                    Enter your credentials below and resume work on skill verification, peer reviews, and portfolio management.
                  </p>
                </div>

                <div className="space-y-4 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 text-slate-300">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Shield size={18} />
                    <span>Protected session, monitored access.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Key size={18} />
                    <span>Strong passwords keep your credentials safe.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Mail size={18} />
                    <span>Instant access with a smooth login animation.</span>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="animate-slide-in-right rounded-[2rem] bg-slate-950/90 p-8 sm:p-10 shadow-[0_20px_80px_rgba(15,23,42,0.45)]"
              >
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-[0.35em] text-indigo-400">Welcome back</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Sign in to continue</h2>
                </div>

                <div className="grid gap-5">
                  <label className="block text-sm text-slate-300">
                    <span className="mb-2 block text-slate-400">Email address</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="hello@example.com"
                      className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>

                  <label className="block text-sm text-slate-300">
                    <span className="mb-2 block text-slate-400">Password</span>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                </div>

                {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-600"
                >
                  {isSubmitting ? "Signing in..." : "Sign in securely"}
                </button>

                <p className="mt-5 text-center text-sm text-slate-500">
                  New here? <button type="button" onClick={() => setShowIntro(true)} className="text-indigo-300 hover:text-indigo-200">See how it works</button>
                </p>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
