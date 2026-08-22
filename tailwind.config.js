/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-brown": "#6B4226",
        "dark-brown": "#4E2F19",
        "dark-beige": "#E3D8C0",
        "light-beige": "#FBF6EC",
        beige: "#F7EED3",
        sage: "#8FA178",
        "sage-dark": "#6F8259",
        ink: "#3B2A1E",
        "ink-muted": "#8A7A66",
        gold: "#D8A427",
        "nav-bg": "#D5CEBC",
        "nav-border": "#C4BBA3",
      },
      fontFamily: {
        serif: ["Domine", "Georgia", "serif"],
        sans: ["Work Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
