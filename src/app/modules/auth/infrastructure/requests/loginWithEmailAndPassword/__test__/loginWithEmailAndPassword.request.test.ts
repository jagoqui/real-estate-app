import {AUTH_RESPONSE_MOCK} from '@/data/mocks/authResponse/authResponse.mock';
import {LOGIN_USER_WITH_EMAIL_AND_PASSWORD_MOCK} from '@/data/mocks/loginUserWithEmailAndPassword/loginUserWithEmailAndPassword.mock';
import * as authResponseAdapterModule from '@/modules/auth/application/adapters/auth-response/auth-response.adapter';
import {api} from '@/modules/shared/infrastructure/clients/ky/ky.client';
import {loginWithEmailAndPasswordRequest} from '../loginWithEmailAndPassword.request';

vi.mock('@/modules/shared/infrastructure/clients/ky/ky.client', () => ({
  api: {
    post: vi.fn(),
  },
}));

const postSpy = vi.spyOn(api, 'post');

describe('loginWithEmailAndPassword.request', () => {
  beforeEach(() =>
    vi.spyOn(authResponseAdapterModule, 'authResponseAdapter').mockReturnValue(AUTH_RESPONSE_MOCK)
  );

  afterEach(() => vi.clearAllMocks());

  it('should call the API with the correct parameters', async () => {
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockResolvedValue({}),
    } as unknown as ReturnType<typeof api.post>);

    const result = await loginWithEmailAndPasswordRequest(LOGIN_USER_WITH_EMAIL_AND_PASSWORD_MOCK);

    expect(api.post).toHaveBeenNthCalledWith(1, LOGIN_USER_WITH_EMAIL_AND_PASSWORD_MOCK, {
      json: LOGIN_USER_WITH_EMAIL_AND_PASSWORD_MOCK,
    });
    expect(result).toEqual(AUTH_RESPONSE_MOCK);

    expect(authResponseAdapterModule.authResponseAdapter).toHaveBeenNthCalledWith(1, {});
    expect(authResponseAdapterModule.authResponseAdapter).toHaveBeenCalledTimes(1);
  });
});
