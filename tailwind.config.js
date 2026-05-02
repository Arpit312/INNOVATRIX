export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        neon: {
          cyan: "#00f5ff",
          purple: "#bf00ff",
          blue: "#0066ff",
          pink: "#ff0080",
          violet: "#7c3aed",
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0,245,255,0.35), 0 0 60px rgba(0,245,255,0.12)",
        "neon-purple": "0 0 20px rgba(191,0,255,0.35), 0 0 60px rgba(191,0,255,0.12)",
        "neon-pink": "0 0 20px rgba(255,0,128,0.35), 0 0 60px rgba(255,0,128,0.12)",
        "neon-sm": "0 0 12px rgba(0,245,255,0.25)",
        "neon-lg": "0 0 40px rgba(0,245,255,0.3), 0 0 80px rgba(0,245,255,0.1)",
        "card-glow": "0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,245,255,0.05)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        float: "float 4.5s ease-in-out infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "gradient-shift": "gradient-shift 4s linear infinite",
        flicker: "flicker 8s ease-in-out infinite",
        "aura-pulse": "aura-pulse 3.5s ease-in-out infinite",
        "energy-ring": "energy-ring 2.5s ease-out infinite",
        "scan-sweep": "scan-sweep 4s linear infinite",
        "holo-shine": "holo-shine 8s ease infinite",
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #00c8ff, #7c3aed)",
        "neon-gradient": "linear-gradient(90deg, #00f5ff, #a78bfa, #f472b6)",
        "fire-gradient": "linear-gradient(90deg, #f97316, #ef4444, #ec4899)",
        "dark-glass": "linear-gradient(135deg, rgba(8,18,40,0.88), rgba(4,8,22,0.78))",
      },
      backdropBlur: {
        "3xl": "48px",
        "4xl": "64px",
      },
      scale: {
        "102": "1.02",
        "103": "1.03",
        "108": "1.08",
      },
    },
  },
  plugins: [],
};
