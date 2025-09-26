import react from '@vitejs/plugin-react';
import {defineConfig, type UserConfig} from 'vite';
import viteConfigBase from './vite.config.base';

export default defineConfig(
  configEnv =>
    ({
      ...viteConfigBase(configEnv),
      plugins: [viteConfigBase(configEnv).plugins, react()],
    }) satisfies UserConfig,
);
