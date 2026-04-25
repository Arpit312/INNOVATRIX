/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*/.{js,jsx,ts,tsx}",  // ✅ Vite ke liye important
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}