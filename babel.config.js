module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          root: ['./src'],
          alias: {
            src: "./src",
          },
        },
      ],
      ["nativewind/babel"],
      ["react-native-reanimated/plugin"],
    ],
  }
}
