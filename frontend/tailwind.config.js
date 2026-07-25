/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // The core accent colors for buttons, active states, and highlights
        accent: '#059669',       // Emerald 600
        accentHover: '#047857',  // Emerald 700 (for hover states)

        // Monochrome structural colors
        base: '#F9FAFB',         // Very light gray for the main app background
        surface: '#FFFFFF',      // Pure white for sidebar and component cards
        primary: '#111827',      // Near-black for primary headings and text
        secondary: '#6B7280',    // Mid-gray for secondary text, labels, and borders
      },

      fontFamily: {
        // The Industry Standard pairing
        sans: ['Inter', 'sans-serif'],        // Global UI, Replaces the default Tailwind sans
        mono: ['"JetBrains Mono"', 'monospace'] // KPIs, Leaderboard Scores, Metrics
      }
    },
  },
}