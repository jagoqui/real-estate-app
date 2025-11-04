import { CREATE_USER_MOCK } from '@/data/mocks/createUser/createUser.mock';
import { CREATE_USER_DTO_MOCK } from '@/data/mocks/createUser/createUserDto.mock';
import { USER_DTO_MOCK } from '@/data/mocks/users/userDto.mock';
import * as userRoleDtoAdapterModule from '../../userRoleDto/userRoleDto.adapter';
import { createUserAdapter } from '../createUserDto.adapter';

describe('CreateUserDto Adapter', () => {
  beforeEach(() => {
    vi.spyOn(userRoleDtoAdapterModule, 'userRoleDtoAdapter').mockReturnValue(USER_DTO_MOCK.role);
  });

  afterEach(() => vi.clearAllMocks());
  it('should adapt CreateUserDto to CreateUser', () => {
    const userDto = createUserAdapter(CREATE_USER_MOCK);

    expect(userDto).toEqual(CREATE_USER_DTO_MOCK);
  });
});
