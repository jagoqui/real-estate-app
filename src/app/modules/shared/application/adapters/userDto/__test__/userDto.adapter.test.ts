import { USER_MOCK } from '@/data/mocks/users/user.mock';
import { USER_DTO_MOCK } from '@/data/mocks/users/userDto.mock';
import * as userRoleDtoAdapterModule from '../../userRoleDto/userRoleDto.adapter';
import { userDtoAdapter } from '../userDto.adapter';

describe('UserDto Adapter', () => {
  beforeEach(() => vi.spyOn(userRoleDtoAdapterModule, 'userRoleDtoAdapter').mockReturnValue(USER_DTO_MOCK.role));

  it('should adapt user to user dto', () => {
    const userDto = userDtoAdapter(USER_MOCK);

    expect(userDto).toEqual(USER_DTO_MOCK);
    expect(userRoleDtoAdapterModule.userRoleDtoAdapter).toHaveBeenCalledWith(USER_MOCK.role);
    expect(userRoleDtoAdapterModule.userRoleDtoAdapter).toHaveBeenCalledTimes(1);
  });
});
