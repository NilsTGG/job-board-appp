/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#050505",
          dark: "#0a0a0a",
          surface: "#121212",
          border: "#2a2a2a",
          primary: "#3b82f6",
          accent: "#8b5cf6",
          success: "#10b981",
          glow: "rgba(59, 130, 246, 0.5)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom right, #0a0a0a, #1a1a1a)",
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      animation: {
        "text-gradient": "text-gradient 1.5s linear infinite",
      },
      keyframes: {
        "text-gradient": {
          to: {
            "background-position": "200% center",
          },
        },
      },
    },
  },
  plugins: [],
};
