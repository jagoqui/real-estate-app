import {AUTH_RESPONSE_MOCK} from '@/data/mocks/authResponse/authResponse.mock';
import {AUTH_RESPONSE_DTO_MOCK} from '@/data/mocks/authResponse/authResponseDto.mock';
import * as authResponseAdapterModule from '@/modules/auth/application/adapters/auth-response/auth-response.adapter';
import {api} from '@/modules/shared/infrastructure/clients/ky/ky.client';
import {REFRESH_TOKEN_REQUEST_URL, refreshTokenRequest} from '../refreshToken.request';

vi.mock('@/modules/shared/infrastructure/clients/ky/ky.client', () => ({
  api: {
    post: vi.fn(),
  },
}));

const postSpy = vi.spyOn(api, 'post');
const refreshToken = 'mockRefreshToken';

describe('refreshToken.request', () => {
  beforeEach(() => {
    vi.spyOn(authResponseAdapterModule, 'authResponseAdapter').mockReturnValue(AUTH_RESPONSE_MOCK);
  });

  afterEach(() => vi.clearAllMocks());

  it('should call the API with the correct parameters', async () => {
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockResolvedValue(AUTH_RESPONSE_DTO_MOCK),
    } as unknown as ReturnType<typeof api.post>);

    const result = await refreshTokenRequest({refreshToken});

    expect(api.post).toHaveBeenNthCalledWith(1, REFRESH_TOKEN_REQUEST_URL, {json: {refreshToken}});
    expect(result).toEqual(AUTH_RESPONSE_MOCK);

    expect(authResponseAdapterModule.authResponseAdapter).toHaveBeenNthCalledWith(
      1,
      AUTH_RESPONSE_DTO_MOCK
    );
    expect(authResponseAdapterModule.authResponseAdapter).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the API call fails', async () => {
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockRejectedValue(new Error('API Error')),
    } as unknown as ReturnType<typeof api.post>);
    await expect(refreshTokenRequest({refreshToken})).rejects.toThrow('API Error');
  });
});
