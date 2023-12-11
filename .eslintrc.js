const defaultConfig = require("./config/eslint.js");
const { mergeDeepLeft } = require("ramda");

module.exports = mergeDeepLeft(
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "off",
    },
  },
  defaultConfig
);
