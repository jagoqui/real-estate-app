import { AUTH_RESPONSE_MOCK } from '@/data/mocks/authResponse/authResponse.mock';
import { AUTH_RESPONSE_DTO_MOCK } from '@/data/mocks/authResponse/authResponseDto.mock';
import { CREATE_USER_MOCK } from '@/data/mocks/createUser/createUser.mock';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import * as authResponseAdapterModule from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.adapter';
import { registerRequest } from '../register.request';

vi.mock('@/modules/shared/infrastructure/clients/ky/ky.client', () => ({
  api: {
    post: vi.fn(),
  },
}));

const postSpy = vi.spyOn(api, 'post');

describe('register.request', () => {
  beforeEach(() => vi.spyOn(authResponseAdapterModule, 'authResponseAdapter').mockReturnValue(AUTH_RESPONSE_MOCK));

  afterEach(() => vi.clearAllMocks());

  it('should call the API with the correct parameters', async () => {
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockResolvedValue(AUTH_RESPONSE_DTO_MOCK),
    } as unknown as ReturnType<typeof api.post>);

    const result = await registerRequest(CREATE_USER_MOCK);

    expect(api.post).toHaveBeenNthCalledWith(1, expect.any(String), { json: CREATE_USER_MOCK });
    expect(result).toEqual(AUTH_RESPONSE_MOCK);

    expect(authResponseAdapterModule.authResponseAdapter).toHaveBeenNthCalledWith(1, AUTH_RESPONSE_DTO_MOCK);
    expect(authResponseAdapterModule.authResponseAdapter).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the API call fails', async () => {
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockRejectedValue(new Error('API Error')),
    } as unknown as ReturnType<typeof api.post>);
    await expect(registerRequest(CREATE_USER_MOCK)).rejects.toThrow('API Error');
  });
});
