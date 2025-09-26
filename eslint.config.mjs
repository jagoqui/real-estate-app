// @ts-check
import {defineConfig} from 'eslint/config';
import baseConfig from './eslint.config.base.mjs';
import reactConfig from './eslint.config.react.mjs';
import testConfig from './eslint.config.test.mjs';

export default defineConfig([
  {
    extends: [baseConfig, reactConfig, testConfig],
  },
]);
