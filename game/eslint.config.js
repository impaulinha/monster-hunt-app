const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
  expoConfig,
  {
    root: true,
    env: {
      node: true,
      es2021: true,
    },
    plugins: ['prettier'],
    ignores: ['dist/*', 'node_modules/*'],
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'eol-last': ['error', 'never'],
    },
  },
])
