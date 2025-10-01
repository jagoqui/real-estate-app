import {OWNER_MOCK} from '@/data/mocks/owners/owner.mock';
import {OWNER_DTO_MOCK} from '@/data/mocks/owners/ownerDto.mock';
import {ownerDtoAdapter} from '../ownerDto.adapter';

describe('OwnerDto Adapter', () => {
  it('should adapt Owner to OwnerDto', () => {
    const ownerDto = ownerDtoAdapter(OWNER_DTO_MOCK);
    expect(ownerDto).toEqual(OWNER_MOCK);
  });
});
