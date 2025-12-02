import {defineConfig, mergeConfig} from 'vite';
import reactConfig from './config/vite/vite.config.react';
import vitestConfig from './config/vite/vitest.config';

export default defineConfig(configEnv =>
  mergeConfig(reactConfig(configEnv), vitestConfig(configEnv)),
);
