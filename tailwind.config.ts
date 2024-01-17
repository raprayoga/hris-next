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
        primary: "#f13b2f",
        red: "#f42619",
        gray: "#c6c0c0",
        "gray-1": "#ececec",
        "gray-shadow": "#d1d1d1",
        black: "#333130",
        green: "#52bd94",
        salmon: "#fff5f3",
        yellow: '#ffc107'
      },
    },
  },
  plugins: [],
};
export default config;
