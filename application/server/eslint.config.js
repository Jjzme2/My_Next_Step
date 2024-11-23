const js = require("@eslint/js");

module.exports = [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },
];
