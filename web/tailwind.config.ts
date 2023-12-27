import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        "yellow-600": "#FDDC2E",
        "yellow-100": "#FEF9C3",
        "yellow-500": "#C5A91D",
        "grey-bg": "#1F2937",
        "grey-100": "#F3F4F6",
        "grey-700": "#374151",
        "grey-300": "#D2D5DA",
        "grey-400": "#9CA3AF",
      },
      borderWidth: {
        "3": "3px",
      },
    },
  },
  plugins: [],
};
export default config;
