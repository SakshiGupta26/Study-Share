/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      colors: {
        background: "#111111",
        card: "#FFFFFF",
        peach: "#FFB088",
        text: "#6B7280",
      },
    },
  },

  plugins: [],
};