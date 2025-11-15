module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: "#00ffea",
        accent: "#7c3aed",
        glass: "rgba(255,255,255,0.04)"
      },
      boxShadow: {
        'neon': '0 6px 30px -10px rgba(0,255,234,0.15)'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
