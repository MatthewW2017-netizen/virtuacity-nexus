import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          indigo: "#4B3FE2",
          purple: "#7C3AED",
          dark: "#050505",
          card: "#0D0D10",
          border: "#1F1F23",
          cyan: "#06B6D4",
          magenta: "#D946EF",
        },
      },
      fontFamily: {
        sans: ["var(--font-nexus-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-nexus-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
