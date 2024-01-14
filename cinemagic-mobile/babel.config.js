module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['.'],
        alias: {
          assets: './assets',
          components: './src/components',
          hooks: './src/Hooks',
          screens: './src/screens',
          providers: './src/Providers',
        },
      }],
      'module:react-native-dotenv', 
      'react-native-reanimated/plugin',
    ],
  };
};
