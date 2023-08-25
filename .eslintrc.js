const defaultConfig = require("./config/eslint/index.js");
const { mergeDeepLeft } = require("ramda");

module.exports = mergeDeepLeft(
  {
    rules: {
      "@bigbinary/neeto/webpack-aliases-and-jsconfig-paths-should-be-in-sync":
        "off",
      "@bigbinary/neeto/no-missing-localization": [
        "error",
        {
          translationsDir: "./src/translations",
          languages: ["en"],
        },
      ],
      "@bigbinary/neeto/no-dumb-components-with-use-translation": "off",
    },
  },
  defaultConfig
);
