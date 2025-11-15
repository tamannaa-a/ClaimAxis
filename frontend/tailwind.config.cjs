module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: "#03ffd6",
        accent: "#8b5cf6",
        glass: "rgba(255,255,255,0.04)",
        panel: "rgba(8,12,20,0.6)"
      },
      boxShadow: {
        'neon-lg': '0 12px 40px -10px rgba(3,255,214,0.14)',
        'soft-glow': '0 8px 60px -20px rgba(139,92,246,0.18)'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
