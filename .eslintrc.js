module.exports = {
  extends: ['airbnb-base', 'prettier', 'prettier/react', 'plugin:react/recommended'],
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': ['error'],
    'class-methods-use-this': [0],
    'no-unused-vars': ['error', { varsIgnorePattern: 'history' }],
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: { jsx: true, arrowFunctions: true },
  }
}