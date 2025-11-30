import { AUTH_RESPONSE_MOCK } from '@/data/mocks/authResponse/authResponse.mock';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import * as authResponseAdapterModule from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.adapter';
import { LOGIN_WITH_GOOGLE_REQUEST_URL, loginWithGoogleRequest } from '../loginWithGoogle.request';

vi.mock('@/modules/shared/infrastructure/clients/ky/ky.client', () => ({
  api: {
    post: vi.fn(),
  },
}));

const postSpy = vi.spyOn(api, 'post');
const code = 'test-code';

describe('loginWithGoogle.request', () => {
  beforeEach(() => vi.spyOn(authResponseAdapterModule, 'authResponseAdapter').mockReturnValue(AUTH_RESPONSE_MOCK));

  afterEach(() => vi.clearAllMocks());

  it('should call the API with the correct parameters', async () => {
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockResolvedValue({}),
    } as unknown as ReturnType<typeof api.post>);

    const result = await loginWithGoogleRequest({ code });

    expect(api.post).toHaveBeenNthCalledWith(1, LOGIN_WITH_GOOGLE_REQUEST_URL, { json: { code } });
    expect(result).toEqual(AUTH_RESPONSE_MOCK);

    expect(authResponseAdapterModule.authResponseAdapter).toHaveBeenNthCalledWith(1, {});
    expect(authResponseAdapterModule.authResponseAdapter).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the API call fails', async () => {
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockRejectedValue(new Error('API Error')),
    } as unknown as ReturnType<typeof api.post>);
    await expect(loginWithGoogleRequest({ code })).rejects.toThrow('API Error');
  });
});
