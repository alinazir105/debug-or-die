/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        smoke: {
          "0%": {
            opacity: "0.4",
            transform: "translate(-50%, 0) scale(1)",
          },
          "25%": {
            opacity: "0.3",
            transform: "translate(-50%, -10px) scale(1.2)",
          },
          "50%": {
            opacity: "0.2",
            transform: "translate(-50%, -20px) scale(1.4)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -40px) scale(1.8)",
          },
        },
      },
      animation: {
        smoke: "smoke 3s ease-in-out infinite",
      },
      
    },
  },
  plugins: [],
};
