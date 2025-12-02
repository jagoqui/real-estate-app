import { OWNER_MOCK } from '@/data/mocks/owners/owner.mock';
import { OWNER_DTO_MOCK } from '@/data/mocks/owners/ownerDto.mock';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import * as ownerMapperModule from '@/modules/shared/infrastructure/mappers/owner/owner.mapper';
import { getOwnerByIdRequest, OWNER_BY_ID_REQUEST_URL } from '../getOwnerById.request';

vi.mock('@/modules/shared/infrastructure/clients/ky/ky.client', () => ({
  api: {
    get: vi.fn(),
  },
}));

const getSpy = vi.spyOn(api, 'get');

describe('fetchGetOwnerById.request', () => {
  beforeEach(() => {
    vi.spyOn(ownerMapperModule, 'mapOwnerToModel').mockReturnValue(OWNER_MOCK);
  });

  afterEach(() => vi.clearAllMocks());

  it('should call the API with the correct parameters', async () => {
    getSpy.mockReturnValueOnce({
      json: vi.fn().mockResolvedValue(OWNER_DTO_MOCK),
    } as unknown as ReturnType<typeof api.post>);

    const result = await getOwnerByIdRequest({ id: OWNER_DTO_MOCK.idOwner });

    expect(api.get).toHaveBeenNthCalledWith(1, OWNER_BY_ID_REQUEST_URL(OWNER_DTO_MOCK.idOwner));
    expect(result).toEqual(OWNER_MOCK);
  });

  it('should throw an error if the API call fails', async () => {
    getSpy.mockReturnValueOnce({
      json: vi.fn().mockRejectedValue(new Error('API Error')),
    } as unknown as ReturnType<typeof api.get>);
    await expect(getOwnerByIdRequest({ id: OWNER_DTO_MOCK.idOwner })).rejects.toThrow('API Error');
  });
});
