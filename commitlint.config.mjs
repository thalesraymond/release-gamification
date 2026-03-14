export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Disable strict rules that often cause frustration
    "header-max-length": [0],
    "subject-case": [0],
    "subject-full-stop": [0],
    "type-case": [0],
    "body-max-line-length": [0],
    "footer-max-line-length": [0],

    // Keep core rules for the conventional format
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "chore",
        "docs",
        "style",
        "refactor",
        "test",
        "revert",
        "ci",
        "perf",
      ],
    ],
  },
};
