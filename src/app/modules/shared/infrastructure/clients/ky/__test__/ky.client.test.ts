import { AUTH_RESPONSE_MOCK } from '@/data/mocks/authResponse/authResponse.mock';
import * as getAuthTokenBLModule from '@/modules/shared/domain/businessLogic/getAuthToken/getAuthToken.bl';
import ky, { type NormalizedOptions, type Options } from 'ky';
import type { MockedFunction } from 'vitest';

vi.mock('ky', () => {
  const create = vi.fn();
  return {
    __esModule: true,
    default: { create },
    create,
  };
});

const setup = async (): Promise<unknown> => await import('../ky.client');

let mockKyCreate: MockedFunction<typeof ky.create>;
let capturedConfig: Options | undefined;
const getAuthTokenBLSpy = vi.spyOn(getAuthTokenBLModule, 'getAuthTokenBL');

describe('API Configuration', () => {
  beforeAll(async () => {
    await setup();

    mockKyCreate = ky.create as MockedFunction<typeof ky.create>;
    capturedConfig = mockKyCreate.mock.calls[0]?.[0];

    if (!capturedConfig) {
      throw new Error('Failed to capture ky.create configuration. Check the import path or mock setup.');
    }
  });

  beforeEach(() => {
    const { accessToken, refreshToken } = AUTH_RESPONSE_MOCK;
    getAuthTokenBLSpy.mockClear();
    getAuthTokenBLSpy.mockReturnValue({ accessToken, refreshToken });
  });

  afterEach(() => vi.clearAllMocks());

  it('should call ky.create with the correct configuration', () => {
    expect(mockKyCreate).toHaveBeenNthCalledWith(1, {
      timeout: false,
      hooks: {
        beforeRequest: expect.arrayContaining([expect.any(Function)]) as Array<unknown>,
      },
    });
  });

  it('should call getAuthTokenBL and set the Authorization header correctly', async () => {
    const beforeRequestHook = capturedConfig?.hooks?.beforeRequest?.[0];
    expect(beforeRequestHook).toBeInstanceOf(Function);

    const setFn = vi.fn();

    const mockRequest = {
      headers: {
        set: setFn,
      },
    } as unknown as Request;

    await beforeRequestHook!(mockRequest, {} as NormalizedOptions);

    expect(getAuthTokenBLSpy).toHaveBeenCalledTimes(1);

    const expectedHeaderValue = `Bearer ${AUTH_RESPONSE_MOCK.accessToken}`;
    expect(setFn).toHaveBeenNthCalledWith(1, 'Authorization', expectedHeaderValue);
  });

  it('should NOT set the Authorization header if getAuthTokenBL returns null (no token)', async () => {
    getAuthTokenBLSpy.mockReturnValue(null);

    const beforeRequestHook = capturedConfig?.hooks?.beforeRequest?.[0];

    const setFn = vi.fn();

    const mockRequest = {
      headers: {
        set: setFn,
      },
    } as unknown as Request;

    await beforeRequestHook!(mockRequest, {} as NormalizedOptions);

    expect(getAuthTokenBLSpy).toHaveBeenCalledTimes(1);

    expect(setFn).not.toHaveBeenCalled();
  });
});
