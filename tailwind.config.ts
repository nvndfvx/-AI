import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: { soft: "0 12px 30px rgba(15, 23, 42, 0.08)" },
      colors: {
        ink: "#0f172a",
        soft: "#f8fafc",
        accent: "#7c3aed",
        success: "#10b981",
        warning: "#f59e0b",
      },
    },
  },
  plugins: [],
};

export default config;
