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
    "class-methods-use-this": "off",
    "no-console": "off",
    "no-return-assign": "off",
    "no-use-before-define": "off",
    "no-plusplus" : "off",
    "no-useless-escape": "off",
  }
};
