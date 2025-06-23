// client/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // New Palette
        ink: "#121212",
        "ink-secondary": "#2d2d2d",
        paper: "#FBF9F1",
        "paper-secondary": "#E5E1DA",
        gold: "#B08968",
        "gold-light": "#DDB892",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
