/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./Framework/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.tsx",
    './app/**/*.{js,jsx,ts,tsx}',
    
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};


