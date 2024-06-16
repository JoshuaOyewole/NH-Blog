import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "3xl": "1920px",
      },
      fontFamily: {
        'roboto-slab': ['"Roboto Slab"', 'serif'],
        "worksans": ['"Work Sans"', 'sans-serif'],
      },
      colors: {
        townhall: {
          background:"var(--background)",
          black50: "var(--black-50)",
          black100: "var(--black-100)",
          neutral400: "var(--neutral-400)",
        },
      }
    },
  },
  plugins: [],
};
export default config;
