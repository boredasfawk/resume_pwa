// make into json

module.exports = {
  parser: "babel-eslint",
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    "react",
    "jest",
    "prettier"
  ],
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  // rules: {
  //   prettier: "error",
  //   no-console: "off",
  //   comma-dangle: "off",
  //   react/jsx-filename-extension: "off"
  // }
};