import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import ts from "typescript-eslint";

export default ts.config(
  prettier,
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  ts.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  perfectionist.configs["recommended-natural"],
  unicorn.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "unused-imports": unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "perfectionist/sort-objects": "off",
      "unused-imports/no-unused-imports": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    extends: [ts.configs.disableTypeChecked],
    files: ["**/*.js"],
  },
);
