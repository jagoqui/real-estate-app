import { OWNER_MOCK } from '@/data/mocks/owners/owner.mock';
import { OWNER_DTO_MOCK } from '@/data/mocks/owners/ownerDto.mock';
import { ownerAdapter } from '../owner.adapter';

describe('Owner Adapter', () => {
  it('should adapt OwnerDto to Owner', () => {
    const ownerDto = ownerAdapter(OWNER_MOCK);
    expect(ownerDto).toEqual(OWNER_DTO_MOCK);
  });
});
