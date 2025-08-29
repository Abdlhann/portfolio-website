module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "single"],
    "no-undef": "off"  // Temporarily disable no-undef rule
  },
  globals: {
    "module": true,
    "require": true,
    "exports": true
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
};
