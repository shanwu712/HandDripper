/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-brown": "#84643f",
        "dark-brown": "#834e11",
        "dark-beige": "#d5cebc",
        "light-beige": "#FFF8E8",
        beige: "#F7EED3",
        sage: "#AAB396",
      },
    },
  },
  plugins: [],
};
