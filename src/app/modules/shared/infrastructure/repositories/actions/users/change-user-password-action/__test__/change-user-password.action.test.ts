import { CHANGE_PASSWORD_INPUT_MOCK } from '@/data/mocks/users/change-password-Input.mock';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';
import { changeUserPasswordAction } from '../change-user-password.action';

vi.mock('@/modules/shared/infrastructure/clients/ky/ky.client', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('changeUserPasswordAction', () => {
  afterEach(() => vi.clearAllMocks());

  it('should call API.post with correct URL and payload', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);

    await changeUserPasswordAction(CHANGE_PASSWORD_INPUT_MOCK);

    expect(api.post).toHaveBeenNthCalledWith(
      1,
      `${USER_ENDPOINTS.BY_ID(CHANGE_PASSWORD_INPUT_MOCK.userId)}/change-password`,
      {
        json: { newPassword: CHANGE_PASSWORD_INPUT_MOCK.newPassword },
      }
    );

    expect(api.post).toHaveBeenCalledTimes(1);
  });

  it('should propagate error if API.post fails', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('API Error'));

    await expect(changeUserPasswordAction(CHANGE_PASSWORD_INPUT_MOCK)).rejects.toThrow('API Error');
  });

  it('should return void on success', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);

    const result = await changeUserPasswordAction(CHANGE_PASSWORD_INPUT_MOCK);

    expect(result).toBeUndefined();
  });
});
