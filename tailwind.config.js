/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000", // Pure Black for better OLED contrast
        surface: "#121212", // Slightly lighter black
        primary: "#4ade80", // Brighter Green
        secondary: "#60a5fa", // Brighter Blue
        text: "#ffffff", // Pure White
        muted: "#9ca3af", // Lighter Gray for better readability
        border: "#27272a",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
