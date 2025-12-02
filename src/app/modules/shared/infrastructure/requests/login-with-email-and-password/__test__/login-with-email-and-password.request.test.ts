import { AUTH_RESPONSE_MOCK } from '@/data/__mocks__/auth-response/auth-response.mock';
import { LOGIN_USER_WITH_EMAIL_AND_PASSWORD_MOCK } from '@/data/__mocks__/login-user-with-email-and-password/login-user-with-email-and-password.mock';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import * as authMapperModule from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.mapper';
import {
  LOGIN_WITH_EMAIL_AND_PASSWORD_REQUEST_URL,
  loginWithEmailAndPasswordRequest,
} from '../login-with-email-and-password.request';

vi.mock('@/modules/shared/infrastructure/clients/ky/ky.client', () => ({
  api: {
    post: vi.fn(),
  },
}));

const postSpy = vi.spyOn(api, 'post');

describe('loginWithEmailAndPassword.request', () => {
  beforeEach(() => vi.spyOn(authMapperModule, 'mapAuthResponseToModel').mockReturnValue(AUTH_RESPONSE_MOCK));

  afterEach(() => vi.clearAllMocks());

  it('should call the API with the correct parameters', async () => {
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockResolvedValue({}),
    } as unknown as ReturnType<typeof api.post>);

    const result = await loginWithEmailAndPasswordRequest(LOGIN_USER_WITH_EMAIL_AND_PASSWORD_MOCK);

    expect(api.post).toHaveBeenNthCalledWith(1, LOGIN_WITH_EMAIL_AND_PASSWORD_REQUEST_URL, {
      json: LOGIN_USER_WITH_EMAIL_AND_PASSWORD_MOCK,
    });
    expect(result).toEqual(AUTH_RESPONSE_MOCK);

    expect(authMapperModule.mapAuthResponseToModel).toHaveBeenNthCalledWith(1, {});
    expect(authMapperModule.mapAuthResponseToModel).toHaveBeenCalledTimes(1);
  });
});
