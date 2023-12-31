module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@core": "./src/core",
            "@routes": "./src/routes",
            "@features": "./src/features",
            "@services": "./src/services",
            "@store": "./src/store",
          },
        },
      ],
    ],
  };
};
