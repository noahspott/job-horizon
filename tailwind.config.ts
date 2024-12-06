import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": { left: "0%" },
          "100%": { left: "100%" },
        },
      },
      animation: {
        shine: "shine 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
