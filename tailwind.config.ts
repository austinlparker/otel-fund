import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        silkscreen: ["Silkscreen", "cursive"],
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
      colors: {
        sapphire_blue: {
          50: "#e2e4f3",

          100: "#c5c9e8",

          200: "#a8b0df",

          300: "#8b96d6",

          400: "#6e7dcf",

          500: "#4d64c9",

          600: "#384ea9",

          700: "#2a3b80",

          800: "#1d2958",

          900: "#111834",
        },
        violet: {
          50: "#e9e2f3",

          100: "#d5c5e8",

          200: "#c1a8de",

          300: "#af8ad6",

          400: "#9e6cce",

          500: "#8f49c8",

          600: "#7437a5",

          700: "#58297d",

          800: "#3d1d57",

          900: "#241133",
        },
        fuschia: {
          50: "#f2e0eb",

          100: "#e7c0d8",

          200: "#dca0c6",

          300: "#d37fb5",

          400: "#cb58a5",

          500: "#b43c8f",

          600: "#8f3072",

          700: "#6d2456",

          800: "#4c193c",

          900: "#2d0f23",
        },
        red: {
          50: "#f2e1e0",

          100: "#e7c3c1",

          200: "#dda4a2",

          300: "#d48582",

          400: "#cc625e",

          500: "#b9443d",

          600: "#943631",

          700: "#702925",

          800: "#4e1d1a",

          900: "#2e110f",
        },
        amber: {
          50: "#FFF7E5",
          100: "#FFEFCC",
          200: "#FFDD94",
          300: "#FFCD61",
          400: "#FFBB29",
          500: "#F5A800",
          600: "#C28400",
          700: "#946500",
          800: "#614200",
          900: "#332300",
          950: "#191100",
        },
        chartreuse: {
          50: "#d6ebcc",

          100: "#abd891",

          200: "#7cc541",

          300: "#6baa38",

          400: "#5b9030",

          500: "#4b7727",

          600: "#3b5f1f",

          700: "#2d4718",

          800: "#1f3110",

          900: "#121d09",
        },
        malachite_green: {
          50: "#cfecd5",

          100: "#99daa8",

          200: "#4ec972",

          300: "#3aaf5e",

          400: "#319450",

          500: "#297a42",

          600: "#206134",

          700: "#184a28",

          800: "#11331b",

          900: "#0a1e10",
        },
        cyan: {
          50: "#cfeaec",

          100: "#99d6da",

          200: "#4fc2c9",

          300: "#3aa9af",

          400: "#318f94",

          500: "#29767a",

          600: "#205e61",

          700: "#18474a",

          800: "#113133",

          900: "#0a1d1e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
