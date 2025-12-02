import { CREATE_USER_DTO_MOCK } from '@/data/__mocks__/create-user/create-user-dto.mock';
import { CREATE_USER_MOCK } from '@/data/__mocks__/create-user/create-user.mock';
import { USER_DTO_MOCK } from '@/data/__mocks__/users/user-dto.mock';
import * as userRoleMapperModule from '../../user-role/user-role.mapper';
import { mapCreateUserToPayloadDto } from '../create-user.mapper';

describe('mapCreateUser', () => {
  beforeEach(() => {
    vi.spyOn(userRoleMapperModule, 'mapUserRoleToDto').mockReturnValue(USER_DTO_MOCK.role);
  });

  afterEach(() => vi.clearAllMocks());
  it('should adapt CreateUserDto to CreateUser', () => {
    const userDto = mapCreateUserToPayloadDto(CREATE_USER_MOCK);

    expect(userDto).toEqual(CREATE_USER_DTO_MOCK);
  });
});
