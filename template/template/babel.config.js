module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-transform-class-properties', {loose: true}],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@locales': './src/locales',
          '@model': './src/model',
          '@navigation': './src/navigation',
          '@redux': './src/store/redux',
          '@screens': './src/screens',
          '@services': './src/services',
          '@store': './src/store',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@theme': './src/theme',
          '@views': './src/views',
        },
      },
    ],
  ],
};
