// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Remove other colors and keep only black and white
        black: '#000000',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}