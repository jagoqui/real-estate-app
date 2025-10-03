import type { UserConfig } from 'vite';
import { defineConfig } from 'vitest/config';
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
        reporters: ['verbose', 'vitest-sonar-reporter'],
        outputFile: {
          'vitest-sonar-reporter': './coverage/vitest-sonar-report.xml',
        },
        coverage: {
          enabled: true,
          reporter: ['clover', 'json', 'lcov', 'text', 'text-summary', 'html'],
          reportsDirectory: './coverage',
          include: ['src/app/**'],
          exclude: [
            'src/**/*.{constants,model,dto,schema,config,route,contract}.ts*',
            'src/**/ui/shadcn/*',
            'src/**/ui/react/*', //TODO: Temporary until we have tests for React components
          ],
          thresholds: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
          },
        },
      },
    }) satisfies UserConfig
);
