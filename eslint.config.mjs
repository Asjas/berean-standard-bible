import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import esxPlugin from "eslint-plugin-es-x";
import pluginPromise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";
import globals from "globals";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  pluginPromise.configs["flat/recommended"],
  esxPlugin.configs["flat/restrict-to-es2022"],
  [
    {
      plugins: { "unused-imports": unusedImports },
    },
    {
      files: ["src/**/*.{js,jsx,ts,tsx}"],
      plugins: { react, "react-hooks": reactHooks },
      languageOptions: {
        globals: globals.browser,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          ecmaVersion: 2022,
          sourceType: "module",
          project: "./tsconfig.json",
        },
      },
      settings: {
        "react": { version: "detect" },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true,
            project: "./tsconfig.json",
            tsconfigRootDir: __dirname,
          },
        },
      },
      extends: [
        reactCompiler.configs.recommended,
        reactRefresh.configs.recommended,
        reactRefresh.configs.vite,
        reactHooks.configs.flat["recommended-latest"],
        fixupConfigRules(
          compat.extends(
            "plugin:import/recommended",
            "plugin:import/typescript",
            "plugin:jsx-a11y/recommended",
            "plugin:@tanstack/eslint-plugin-router/recommended",
          ),
        ),
      ],
      rules: {
        "react-refresh/only-export-components": [
          0,
          {
            allowConstantExport: true,
            allowExportNames: ["Route", "loader"],
          },
        ],
      },
    },
  ],
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "src-tauri/**",
      "public/**",
      ".cache/**",
      "*.gen.ts",
    ],
  },
);
