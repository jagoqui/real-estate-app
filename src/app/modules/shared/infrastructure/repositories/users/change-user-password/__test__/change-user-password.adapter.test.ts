import { CHANGE_PASSWORD_COMMAND_MOCK } from '@/data/mocks/users/change-password-command.mock';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';
import { changeUserPasswordAdapter } from '../change-user-password.adapter';

vi.mock('@/modules/shared/infrastructure/clients/ky/ky.client', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('changeUserPasswordAdapter', () => {
  afterEach(() => vi.clearAllMocks());

  it('should call API.post with correct URL and payload', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);

    await changeUserPasswordAdapter(CHANGE_PASSWORD_COMMAND_MOCK);

    expect(api.post).toHaveBeenNthCalledWith(
      1,
      `${USER_ENDPOINTS.BY_ID(CHANGE_PASSWORD_COMMAND_MOCK.userId)}/change-password`,
      {
        json: { newPassword: CHANGE_PASSWORD_COMMAND_MOCK.newPassword },
      }
    );

    expect(api.post).toHaveBeenCalledTimes(1);
  });

  it('should propagate error if API.post fails', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('API Error'));

    await expect(changeUserPasswordAdapter(CHANGE_PASSWORD_COMMAND_MOCK)).rejects.toThrow('API Error');
  });

  it('should return void on success', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);

    const result = await changeUserPasswordAdapter(CHANGE_PASSWORD_COMMAND_MOCK);

    expect(result).toBeUndefined();
  });
});
