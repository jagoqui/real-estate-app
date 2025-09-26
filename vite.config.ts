import {defineConfig, mergeConfig} from 'vite';
import reactConfig from './vite.config.react';
import vitestConfig from './vitest.config';

export default defineConfig(configEnv =>
  mergeConfig(reactConfig(configEnv), vitestConfig(configEnv)),
);
