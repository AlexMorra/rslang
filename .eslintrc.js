module.exports = {
  env: {
    commonjs: true,
    es6: true,
    browser: true,
  },
  extends: [
    "airbnb-base/legacy",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    "ecmaVersion": 9,
    sourceType: "module",
  },
  rules: {
    "class-methods-use-this": "off"
  }
};
