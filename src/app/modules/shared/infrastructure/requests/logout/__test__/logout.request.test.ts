import {api} from '@/modules/shared/infrastructure/clients/ky/ky.client';
import {LOGOUT_REQUEST_URL, logoutRequest} from '../logout.request';

vi.mock('@/modules/shared/infrastructure/clients/ky/ky.client', () => ({
  api: {
    post: vi.fn(),
  },
}));

const postSpy = vi.spyOn(api, 'post');

describe('logout.request', () => {
  it('should call the API with the correct parameters', async () => {
    const mockResponse = {};
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as ReturnType<typeof api.post>);

    const result = await logoutRequest();

    expect(api.post).toHaveBeenNthCalledWith(1, LOGOUT_REQUEST_URL);
    expect(result).toStrictEqual(mockResponse);
  });

  it('should throw an error if the API call fails', async () => {
    postSpy.mockReturnValueOnce({
      json: vi.fn().mockRejectedValue(new Error('API Error')),
    } as unknown as ReturnType<typeof api.post>);
    await expect(logoutRequest()).rejects.toThrow('API Error');
  });
});
