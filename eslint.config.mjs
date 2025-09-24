// @ts-check
import js from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPath from 'eslint-plugin-path';
import importPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import hexagonalPlugin from './tools/eslint-plugin-hexagonal/index.mjs';

export default defineConfig([
  globalIgnores(['dist']),
  {
    rules: {
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'max-depth': ['error', 3],
      'max-nested-callbacks': ['error', 3],
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
      'no-empty': 'warn',
      'no-eq-null': 'warn',
      'no-floating-decimal': 'error',
      'no-magic-numbers': 'off',
      'no-nested-ternary': 'warn',
      'no-new': 'error',
    },
    files: ['./src/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...jsxA11y.flatConfigs.recommended,
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      // @ts-ignore
      path: eslintPluginPath,
      // @ts-ignore
      hexagonal: hexagonalPlugin,
      import: importPrettier,
      'unused-imports': unusedImports,
    },
    rules: {
      'path/no-relative-imports': 'error',
      'hexagonal/no-invalid-architecture-imports': ['error'],
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: false,
          allowTaggedTemplates: false,
        },
      ],
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'max-lines-per-function': ['error', 60],
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
        },
      ],
      '@typescript-eslint/consistent-indexed-object-style': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'warn',
      '@typescript-eslint/prefer-literal-enum-member': 'warn',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignoreReadonlyClassProperties: true,
          ignoreNumericLiteralTypes: true,
          ignore: [-1, 0, 1],
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
          filter: {
            regex: '^(ts-jest|\\^.*)$',
            match: false,
          },
        },
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        {
          selector: 'method',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'property',
          format: null,
          filter: {
            regex: '^(host)$',
            match: false,
          },
        },
        {
          selector: 'method',
          modifiers: ['override'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
      ],
      complexity: 'error',
      'no-new-wrappers': 'error',
      'no-throw-literal': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': ['warn'],
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'max-lines-per-function': 'off',
    },
  },
  {
    files: ['**/__test__/**/*.test.ts'],
    plugins: {
      // @ts-ignore
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
]);
