// Some code
const {pathsToModuleNameMapper} = require('ts-jest');
const {defaults: tsjPreset} = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.spec.json',
      },
    ],
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
  ],
  transformIgnorePatterns: [
    // 'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
    // SyntaxError: Cannot use import statement outside a module
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|react-native-vector-icons|native-base|react-native-otp-input|i18n-js.*)',
  ],
  cacheDirectory: '.jest/cache',
  verbose: true,
  roots: ['<rootDir>'],
  modulePaths: ['./src/'], // <-- This will be set to 'baseUrl' value
  // modulePathIgnorePatterns: ['src/components/Button'],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@assets/*': ['assets/*'],
      '@components/*': ['components/*'],
      '@hooks/*': ['hooks/*'],
      '@locales/*': ['locales/*'],
      '@navigations/*': ['navigations/*'],
      '@redux/*': ['store/redux/*'],
      '@screens/*': ['screens/*'],
      '@services/*': ['services/*'],
      '@store/*': ['store/*'],
      '@utils/*': ['utils/*'],
      '@constants/*': ['constants/*'],
    } /*, { prefix: '<rootDir>/' } */,
  ),
};
