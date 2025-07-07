import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      semi: ["warn", "always"],
      quotes: ["warn", "double"],
      "no-console": "warn",
      eqeqeq: "error",
      "no-unused-vars": "error",
      "prefer-const": "error",
    },
  },
];

export default eslintConfig;
