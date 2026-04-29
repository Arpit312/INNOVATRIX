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

export default function LoginPage({ onLoginSuccess }) {
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
      if (onLoginSuccess) onLoginSuccess();
      navigate("/");
    }, 700);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.1),_transparent_45%)]" />
      <div className="pointer-events-none absolute right-[-120px] top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl animate-float-pulse" />
      <div className="pointer-events-none absolute left-[-100px] bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-float-pulse" />

      {showIntro ? (
        <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
          <div className="relative z-10 mx-auto w-full max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div className="space-y-6 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-50 px-4 py-2 text-sm text-indigo-700 shadow-sm shadow-indigo-500/5">
                  <Sparkles size={18} />
                  A modern introduction to ProofStack AI
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Welcome</p>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                    Build trust with secure skills verification.
                  </h1>
                  <p className="mt-6 max-w-xl text-slate-600 leading-8">
                    Start with a quick summary of how your workspace can help learners, peers, and employers validate verified skills. Then move into the login flow with a clean animated transition.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {INTRO_STEPS.map((step, idx) => (
                    <div key={idx} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <p className="font-semibold text-slate-900">Step {idx + 1}</p>
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

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-lg shadow-slate-200/30 animate-slide-in-right">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(99,102,241,0.08),_transparent_45%)]" />
                <div className="relative space-y-5">
                  <div className="rounded-3xl border border-slate-300 bg-white p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Why this matters</p>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">A secure login welcomes every collaborator.</h2>
                    <p className="mt-3 text-slate-600 leading-7">
                      Your team can start from the onboarding screen, then authenticate instantly into the dashboard with confidence and motion-led guidance.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {FEATURES.map((feature) => (
                      <div key={feature.title} className="rounded-3xl bg-white p-5 text-sm text-slate-700 border border-slate-300">
                        <p className="font-semibold text-slate-900">{feature.title}</p>
                        <p className="mt-2 text-slate-600 leading-6">{feature.description}</p>
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
          <div className="relative z-10 mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_35px_120px_rgba(0,0,0,0.1)]">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
              <div className="bg-slate-50 p-8 sm:p-10">
                <div className="mb-8 space-y-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-indigo-600">Secure sign in</p>
                  <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Log in to your proof validation workspace.</h1>
                  <p className="text-slate-600 leading-7">
                    Enter your credentials below and resume work on skill verification, peer reviews, and portfolio management.
                  </p>
                </div>

                <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 text-slate-700">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Shield size={18} />
                    <span>Protected session, monitored access.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Key size={18} />
                    <span>Strong passwords keep your credentials safe.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail size={18} />
                    <span>Instant access with a smooth login animation.</span>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="animate-slide-in-right rounded-[2rem] bg-white p-8 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-[0.35em] text-indigo-600">Welcome back</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Sign in to continue</h2>
                </div>

                <div className="grid gap-5">
                  <label className="block text-sm text-slate-700">
                    <span className="mb-2 block text-slate-600 font-medium">Email address</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="hello@example.com"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400"
                    />
                  </label>

                  <label className="block text-sm text-slate-700">
                    <span className="mb-2 block text-slate-600 font-medium">Password</span>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400"
                    />
                  </label>
                </div>

                {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isSubmitting ? "Signing in..." : "Sign in securely"}
                </button>

                <p className="mt-5 text-center text-sm text-slate-600">
                  New here? <button type="button" onClick={() => setShowIntro(true)} className="text-indigo-600 hover:text-indigo-700 font-medium">See how it works</button>
                </p>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
