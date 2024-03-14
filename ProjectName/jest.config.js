// Some code
const {pathsToModuleNameMapper} = require('ts-jest');
const {defaults: tsjPreset} = require('ts-jest/presets');

// see https://jestjs.io/docs/en/configuration#transformignorepatterns-array-string
const packagesToTransformWithBabel = [
  'react-native', // all react-native* packages
  '@react-native-community',
  '@react-navigation',
  'react-native-otp-input',
  'native-base',
  'i18n-js',
];

const transformIgnorePatterns = [
  `<rootDir>/node_modules/(?!(jest-)?@?${packagesToTransformWithBabel.join(
    '|',
  )}.*)`,
];

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
  transformIgnorePatterns: transformIgnorePatterns,
  cacheDirectory: '.jest/cache',
  verbose: true,
  roots: ['<rootDir>'],
  modulePaths: ['./src/'], // <-- This will be set to 'baseUrl' value
  setupFilesAfterEnv: ['./jest.setup.js'],
  // modulePathIgnorePatterns: ['src/components/Button'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(
      {
        '@assets/*': ['assets/*'],
        '@components/*': ['components/*'],
        '@hooks/*': ['hooks/*'],
        '@locales/*': ['locales/*'],
        '@model/*': ['model/*'],
        '@navigation/*': ['navigation/*'],
        '@redux/*': ['store/redux/*'],
        '@screens/*': ['screens/*'],
        '@services/*': ['services/*'],
        '@store/*': ['store/*'],
        '@utils/*': ['utils/*'],
        '@constants/*': ['constants/*'],
        '@theme/*': ['theme/*'],
        '@views/*': ['views/*'],
      } /*, { prefix: '<rootDir>/' } */,
    ),
  },
  fakeTimers: {
    enableGlobally: true,
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'json-summary'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/__mocks__/',
    '/__fixtures__/',
    '/jest/',
    '/src/services/network/',
    '/src/store/todoList/',
  ],
};
