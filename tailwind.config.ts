import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      screens: {
        "xl": "1024px",
      },
      padding: {
        DEFAULT: '1rem',
        lg: '0rem'
      }
    },
    extend: {
      boxShadow: {
        "inner-lg": "inset 0 -2px 4px rgba(0, 0, 0, 0.6)",
      },
      gridTemplateColumns: {
        "layout-desktop": "364px 1fr",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(10%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(10%)", opacity: "0" },
        },
      },

      animation: {
        "slide-in": "slide-in 0.2s ease",
        "slide-out": "slide-out 0.2s ease",
      },
    },
  },
  plugins: [],
};
export default config;
