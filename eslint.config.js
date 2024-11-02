const tsParser = require('@typescript-eslint/parser');

module.exports = {
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        jsx: true, // Allows for the parsing of JSX
      },
    },
  },
  files: ['*.js', '*.ts', '*.tsx'],
  ignores: ['dist/'],
};
