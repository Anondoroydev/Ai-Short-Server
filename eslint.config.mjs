import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ignores: ["eslint.config.mjs"],
    plugins: { js },
    extends: ["js/recommended","prettier"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
]);
