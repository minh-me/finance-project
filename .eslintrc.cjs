module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended", "prettier"],
  ignorePatterns: [".eslintrc.js", "commitlint.config.js"],
  rules: {
    "no-console": "warn",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
