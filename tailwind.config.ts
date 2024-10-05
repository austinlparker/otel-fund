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
        transparent: "transparent",
        current: "currentColor",
        indigo: "#51368D",
        slate: "#25303E",
        pacific: "#0298EC",
        lime: "#64BA00",
        honey: "#FFB000",
        tango: "#F96E10",
        silver: "#D0D3D4",
        fog: "#F0F0F0",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
export default config;
