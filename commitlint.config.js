module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        // Enforce allowed types for commit messages
        "type-enum": [
            2,
            "always",
            [
                "feat", // A new feature
                "fix", // A bug fix
                "docs", // Documentation only changes
                "style", // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
                "refactor", // A code change that neither fixes a bug nor adds a feature
                "perf", // A code change that improves performance
                "test", // Adding missing tests or correcting existing tests
                "build", // Changes that affect the build system or external dependencies (example: gulp, npm)
                "ci", // Changes to CI configuration files and scripts (example: GitHub Actions, CircleCI)
                "chore", // Other changes that don't modify src or test files
                "revert", // Reverts a previous commit
            ],
        ],

        // Enforce the case for the commit subject (default: sentence-case and lower-case allowed)
        "subject-case": [2, "always", ["sentence-case", "lower-case"]],

        // Enforce maximum length for the header (default: 72 characters)
        "header-max-length": [2, "always", 72],

        // Require a scope when a commit type is provided (disabled by default)
        "scope-enum": [0, "always"],

        // Disable the scope requirement
        "scope-empty": [0, "never"],

        // Enforce subject must not be empty
        "subject-empty": [2, "never"],

        // Enforce body must not be empty if present
        "body-empty": [0, "never"],

        // Enforce maximum line length for the body (default: 100 characters)
        "body-max-line-length": [2, "always", 100],

        // Enforce footer must not be empty if present
        "footer-empty": [0, "never"],

        // Enforce maximum line length for the footer (default: 100 characters)
        "footer-max-line-length": [2, "always", 100],

        // Enforce a valid commit message format
        "signed-off-by": [0, "always"],

        // Ensure the type is not empty
        "type-empty": [2, "never"],
    },
};
