import type {UserConfig} from 'vite';
import {defineConfig} from 'vitest/config';
import viteConfigBase from './vite.config.base';

export default defineConfig(
  configEnv =>
    ({
      ...viteConfigBase(configEnv),
      test: {
        name: 'unit',
        environment: 'happy-dom',
        globals: true,
        setupFiles: 'src/tests/setup-vitest.ts',
        include: ['src/**/__test__/**/*.test.ts*'],
        coverage: {
          enabled: true,
          reporter: ['clover', 'json', 'lcov', 'text', 'text-summary', 'html'],
          reportsDirectory: './coverage',
          include: ['src/app/**'],
          exclude: ['src/**/*.{constants,model,dto,schema,config}.ts', 'src/**/UI/**/*'],
          thresholds: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
          },
        },
      },
    }) satisfies UserConfig,
);
