import { CREATE_USER_MOCK } from '@/data/mocks/createUser/createUser.mock';
import { CREATE_USER_DTO_MOCK } from '@/data/mocks/createUser/createUserDto.mock';
import { USER_DTO_MOCK } from '@/data/mocks/users/userDto.mock';
import * as userRoleMapperModule from '../../user-role/user-role.mapper';
import { mapCreateUserToDto } from '../create-user.mapper';

describe('mapCreateUser', () => {
  beforeEach(() => {
    vi.spyOn(userRoleMapperModule, 'mapUserRoleToDto').mockReturnValue(USER_DTO_MOCK.role);
  });

  afterEach(() => vi.clearAllMocks());
  it('should adapt CreateUserDto to CreateUser', () => {
    const userDto = mapCreateUserToDto(CREATE_USER_MOCK);

    expect(userDto).toEqual(CREATE_USER_DTO_MOCK);
  });
});
