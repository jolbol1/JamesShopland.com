// @ts-nocheck
const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import("tailwindcss").Config } */
module.exports = {
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
        mono: ["var(--font-code)", ...defaultTheme.fontFamily.mono],
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        gray: colors.neutral,
      },
    },
  },
  plugins: [],
}
