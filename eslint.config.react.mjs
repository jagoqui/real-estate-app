// @ts-check
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import {defineConfig} from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  {
    files: ['./src/**/*.tsx'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      //@ts-ignore
      'jsx-a11y': jsxA11y,
      prettier,
    },
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {jsx: true},
        sourceType: 'module',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
      'prettier/prettier': 'off',
      'react/require-default-props': 'off',
      ...react.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
