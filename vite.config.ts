import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  envDir:
    mode === 'production'
      ? path.resolve(__dirname, '')
      : path.resolve(__dirname, 'environments'),
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/tests/setup-vitest.ts',
    include: ['**/__test__/**/*.test.tsx', '**/__test__/**/*.test.ts'],
    coverage: {
      enabled: true,
      reporter: ['clover', 'json', 'lcov', 'text', 'text-summary', 'html'],
      reportsDirectory: './coverage',
      include: ['src/app/**'],
      exclude: [
        'src/**/*.{constants,model,dto,schema,config}.ts',
        '**/UI/**/*',
      ],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
}));
