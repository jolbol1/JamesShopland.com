// @ts-check
const colors = /** @type {any} */ (require("tailwindcss/colors"))

/** @type {import("tailwindcss").Config } */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./layouts/**/*.{js,ts,tsx}",
    "./lib/**/*.{js,ts,tsx}",
    "./data/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        maxWidth: "96rem",
      },
      maxWidth: {
        "8xl": "96rem",
      },
      backgroundImage: {
        "card-gradient":
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)",
        "card-gradient-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent)",
      },
      spacing: {
        "9/16": "56.25%",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        mono: [
          "var(--font-code)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: colors.blue,
        gray: colors.neutral,
      },
    },
  },
  plugins: [],
}
