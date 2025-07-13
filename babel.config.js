module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
        [
          'module-resolver',
          {
            alias: {
              '@': './src', // Matches the @src alias in tsconfig.json
            },
          },
        ],
      ],
};
