module.exports = {
  extends: ['@react-native-community', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        'import/order': [
          'warn',
          {
            alphabetize: {
              caseInsensitive: true,
              order: 'asc',
            },
            groups: ['builtin', 'external', 'internal'],
            'newlines-between': 'always',
            pathGroups: [
              {
                group: 'external',
                pattern: 'react',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react'],
          },
        ],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'warn',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'react-hooks/exhaustive-deps': ['warn'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['jest', '@typescript-eslint', 'import'],
  root: true,
};
