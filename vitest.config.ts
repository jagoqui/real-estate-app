import tsconfigPaths from 'vite-tsconfig-paths';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
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
      exclude: ['src/**/*.{constants,model,dto,schema,config}.ts', '**/UI/**/*'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
