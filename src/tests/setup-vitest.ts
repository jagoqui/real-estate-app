import { ENVS_MOCK } from '@/data/mocks/envs/envs.mock';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

process.env = {
  NODE_ENV: 'test',
  ...ENVS_MOCK,
} as typeof process.env;

const originalConsole = { ...console };

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

beforeAll(() => {
  global.console = {
    ...originalConsole,
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  };
});

afterAll(() => {
  global.console = originalConsole;
});
