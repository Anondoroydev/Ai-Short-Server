import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettier,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ignores: ["eslint.config.mjs"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "error",
      "dot-notation": "error",
    },
  },
];
