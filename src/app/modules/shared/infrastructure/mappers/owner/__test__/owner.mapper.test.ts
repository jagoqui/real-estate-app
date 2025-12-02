import { OWNER_MOCK } from '@/data/__mocks__/owners/owner.mock';
import { OWNER_DTO_MOCK } from '@/data/__mocks__/owners/ownerDto.mock';
import { mapOwnerToDto, mapOwnerToModel } from '../owner.mapper';

describe('mapOwner', () => {
  it('should map Owner to OwnerDto', () => {
    const ownerDto = mapOwnerToDto(OWNER_MOCK);
    expect(ownerDto).toEqual(OWNER_DTO_MOCK);
  });

  it('should map OwnerDto to Owner', () => {
    const ownerDto = mapOwnerToModel(OWNER_DTO_MOCK);
    expect(ownerDto).toEqual(OWNER_MOCK);
  });
});
