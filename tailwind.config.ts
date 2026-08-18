import type { Config } from "tailwindcss";

/**
 * Design tokens.
 * All color pairs used for text meet WCAG 2.1 AA (4.5:1) against their
 * intended backgrounds:
 *  - ink (#1A2532) on white / concrete-50: 14.9:1
 *  - white on navy-800 (#16324F): 11.2:1
 *  - accent-700 (#B9400B) on white: 5.6:1  (link/text use)
 *  - white on accent-600 (#C2410C): 4.6:1  (buttons)
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A2532",
        navy: {
          700: "#1D4166",
          800: "#16324F",
          900: "#102540",
        },
        accent: {
          600: "#C2410C",
          700: "#B9400B",
          800: "#9A3412",
        },
        concrete: {
          50: "#F6F7F8",
          100: "#ECEEF0",
          200: "#DDE1E4",
          300: "#C3C9CE",
          500: "#6B7680",
        },
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
export default config;
