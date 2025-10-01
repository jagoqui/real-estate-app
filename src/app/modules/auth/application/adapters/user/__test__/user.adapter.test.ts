import {USER_MOCK} from '@/data/mocks/users/user.mock';
import {USER_DTO_MOCK} from '@/data/mocks/users/userDto.mock';
import * as userRoleAdapterModule from '../../user-role/user-role.adapter';
import {userAdapter} from '../user.adapter';

describe('User Adapter', () => {
  beforeEach(() =>
    vi.spyOn(userRoleAdapterModule, 'userRoleAdapter').mockReturnValue(USER_MOCK.role)
  );

  it('should adapt user dto to user', () => {
    const user = userAdapter(USER_DTO_MOCK);

    expect(user).toEqual(USER_MOCK);
    expect(userRoleAdapterModule.userRoleAdapter).toHaveBeenCalledWith(USER_DTO_MOCK.role);
    expect(userRoleAdapterModule.userRoleAdapter).toHaveBeenCalledTimes(1);
  });
});
