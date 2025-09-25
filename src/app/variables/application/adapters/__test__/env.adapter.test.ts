import {ENVS_MOCK} from '@/data/mocks/envs/envs.mock';
import {type MockInstance} from 'vitest';

import {getEnvs} from '../env.adapter';

let mockExit: MockInstance<typeof process.exit>;

const originalEnv = {...process.env};

describe('getEnvs', () => {
  beforeEach(() => {
    process.env = {...originalEnv};
    mockExit = vi.spyOn(process, 'exit').mockImplementation(((code?: number) => {
      throw new Error(`process.exit: ${code}`);
    }) as never);
  });

  afterEach(() => vi.clearAllMocks());

  it('should return parsed envs from process.env', () => {
    expect(getEnvs()).toEqual(ENVS_MOCK);
  });

  it('should call exit(1) if envs are invalid', () => {
    process.env = {
      ...process.env,
      VITE_API_BASE_URL: '',
    } as typeof process.env;

    expect(() => getEnvs()).toThrow('process.exit: 1');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should not set VITE_SNYK_ORG in production', () => {
    process.env = {
      ...process.env,
      NODE_ENV: 'production',
      ...ENVS_MOCK,
    } as typeof process.env;

    if (ENVS_MOCK.VITE_NODE_ENV !== 'test')
      throw new Error('NODE_ENV should be development for this test');

    const {VITE_SNYK_ORG: _VITE_SNYK_ORG_DEV, ...rest} = ENVS_MOCK;

    expect(getEnvs()).toEqual({
      ...rest,
      VITE_NODE_ENV: 'production',
    });
  });
});
