import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import {defineConfig, type UserConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(
  ({mode}) =>
    ({
      plugins: [tailwindcss(), tsconfigPaths()],
      envDir:
        mode === 'production'
          ? path.resolve(__dirname, '../../')
          : path.resolve(__dirname, '../../environments'),
      base: '/real-estate-app/',
    }) satisfies UserConfig
);
