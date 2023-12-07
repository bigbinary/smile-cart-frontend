module.exports = {
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.{js,jsx}"],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  },
};
