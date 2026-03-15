import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Note: there should be no other properties in this object
    ignores: [
      "**/coverage",
      "**/public",
      "**/dist",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
    ],
  },
  eslintPluginPrettierRecommended,
];
