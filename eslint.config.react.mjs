// @ts-check
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import {defineConfig} from 'eslint/config'
import globals from 'globals'
import baseConfig from './eslint.config.base.mjs'

export default defineConfig([
  baseConfig,
  {
    ...baseConfig[1],
    files: ['./src/**/*.tsx'],
    plugins: {
      ...baseConfig[1].plugins,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      //@ts-ignore
      'jsx-a11y': jsxA11y,
      prettier,
    },
    languageOptions: {
      ...baseConfig[1].languageOptions,
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...baseConfig[1].languageOptions?.globals,
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        ...baseConfig[1].languageOptions?.parserOptions,
        ecmaVersion: 'latest',
        ecmaFeatures: {jsx: true},
        sourceType: 'module',
      },
    },
    rules: {
      ...baseConfig[1].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
      'prettier/prettier': 'off',
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    settings: {
      ...baseConfig[1].settings,
      react: {
        version: 'detect',
      },
    },
  },
])
