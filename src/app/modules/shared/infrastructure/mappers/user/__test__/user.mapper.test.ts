import { USER_MOCK } from '@/data/mocks/users/user.mock';
import { USER_DTO_MOCK } from '@/data/mocks/users/userDto.mock';
import * as userRoleMapper from '../../user-role/user-role.mapper';
import { mapUserToDto, mapUserToModel } from '../user.mapper';

describe('mapUser', () => {
  beforeEach(() => {
    vi.spyOn(userRoleMapper, 'mapUserRoleToModel').mockReturnValue(USER_MOCK.role);
    vi.spyOn(userRoleMapper, 'mapUserRoleToDto').mockReturnValue(USER_DTO_MOCK.role);
  });

  it('should map user dto to user', () => {
    const user = mapUserToModel(USER_DTO_MOCK);

    expect(user).toEqual(USER_MOCK);
    expect(userRoleMapper.mapUserRoleToModel).toHaveBeenCalledWith(USER_DTO_MOCK.role);
    expect(userRoleMapper.mapUserRoleToModel).toHaveBeenCalledTimes(1);
  });

  it('should adapt user to user dto', () => {
    const userDto = mapUserToDto(USER_MOCK);

    expect(userDto).toEqual(USER_DTO_MOCK);
    expect(userRoleMapper.mapUserRoleToDto).toHaveBeenCalledWith(USER_MOCK.role);
    expect(userRoleMapper.mapUserRoleToDto).toHaveBeenCalledTimes(1);
  });
});
