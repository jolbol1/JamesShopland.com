import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import prettierConfig from "eslint-config-prettier"

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: ["coverage/**", "tsconfig.tsbuildinfo"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    rules: {
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  {
    files: [
      "*.config.js",
      "*.config.mjs",
      "next.config.js",
      "next.config.mjs",
      "tailwind.config.js",
      "postcss.config.js",
      "prettier.config.js",
      "next-sitemap.config.js",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["components/mdx/mdx.tsx"],
    rules: {
      "react-hooks/static-components": "off",
    },
  },
  prettierConfig,
]

export default config
