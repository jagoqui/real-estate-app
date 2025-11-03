import reactScan from '@react-scan/vite-plugin-react-scan';
import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';
import viteConfigBase from './vite.config.base';

export default defineConfig(
  configEnv =>
    ({
      ...viteConfigBase(configEnv),
      plugins: [
        viteConfigBase(configEnv).plugins,
        react(),
        reactScan({
          enable: true,
          autoDisplayNames: true,
          scanOptions: {},
        }),
      ],
    }) satisfies UserConfig
);
