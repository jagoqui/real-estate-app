// @ts-check
import vitest from '@vitest/eslint-plugin';
import {defineConfig} from 'eslint/config';
import baseConfig from './eslint.config.base.mjs';

export default defineConfig([
  baseConfig,
  {
    ...baseConfig[1],
    files: ['src/**/__test__/**/*.test.ts'],
    plugins: {
      ...baseConfig[1].plugins,
      // @ts-ignore
      vitest,
    },
    rules: {
      ...baseConfig[1].rules,
      ...vitest.configs.recommended.rules,
      'max-lines-per-function': 'off',
    },
  },
]);
