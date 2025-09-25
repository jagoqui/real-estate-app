import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, mergeConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import vitestConfig from './vitest.config';

export default defineConfig(({mode}) =>
  mergeConfig(
    {
      plugins: [react(), tailwindcss(), tsconfigPaths()],
      envDir:
        mode === 'production'
          ? path.resolve(__dirname, '')
          : path.resolve(__dirname, 'environments'),
    },
    vitestConfig,
  ),
);
