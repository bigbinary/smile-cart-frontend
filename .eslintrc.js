const defaultConfig = require("./config/eslint/index.js");
const { mergeDeepLeft } = require("ramda");

module.exports = mergeDeepLeft(
  {
    rules: {
      "react/react-in-jsx-scope": "off",
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
      "@bigbinary/neeto/ensure-zustand-stores-are-type-annotated": "off",
      "@bigbinary/neeto/zustand-use-with-immutable-actions-wrapper-inside-create":
        "off",
      "@bigbinary/neeto/no-axios-import-outside-apis": "off",
      "@bigbinary/neeto/use-functions-and-hooks-from-neeto-commons-frontend":
        "off",
      "@bigbinary/neeto/use-common-constants": "off",
    },
  },
  defaultConfig
);
