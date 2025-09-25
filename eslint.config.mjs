// @ts-check
import {defineConfig} from 'eslint/config';
import reactConfig from './eslint.config.react.mjs';
import testConfig from './eslint.config.test.mjs';

export default defineConfig([reactConfig, testConfig]);
