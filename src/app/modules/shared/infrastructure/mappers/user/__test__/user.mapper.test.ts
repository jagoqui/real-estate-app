import { USER_DTO_MOCK } from '@/data/mocks/users/user-dto.mock';
import { USER_INPUT_MOCK } from '@/data/mocks/users/user-input.mock';
import { USER_PAYLOAD_DTO_MOCK } from '@/data/mocks/users/user-payload-dto.mock';
import { USER_MOCK } from '@/data/mocks/users/user.mock';
import * as userRoleMapper from '../../user-role/user-role.mapper';
import { mapUserResponseToModel, mapUserToPayloadDto } from '../user.mapper';

describe('mapUser', () => {
  beforeEach(() => {
    vi.spyOn(userRoleMapper, 'mapUserRoleToModel').mockReturnValue(USER_MOCK.role);
    vi.spyOn(userRoleMapper, 'mapUserRoleToDto').mockReturnValue(USER_DTO_MOCK.role);
  });

  describe('mapUser', () => {
    it('should map user dto to user', () => {
      const user = mapUserResponseToModel(USER_DTO_MOCK);

      expect(user).toEqual(USER_MOCK);
      expect(userRoleMapper.mapUserRoleToModel).toHaveBeenCalledWith(USER_DTO_MOCK.role);
      expect(userRoleMapper.mapUserRoleToModel).toHaveBeenCalledTimes(1);
    });
  });

  describe('mapUserToPayloadDto', () => {
    it('should map user response to user dto', () => {
      const userDto = mapUserToPayloadDto(USER_INPUT_MOCK);

      expect(userDto).toEqual(USER_PAYLOAD_DTO_MOCK);
      expect(userRoleMapper.mapUserRoleToDto).toHaveBeenCalledWith(USER_INPUT_MOCK.role);
      expect(userRoleMapper.mapUserRoleToDto).toHaveBeenCalledTimes(1);
    });

    it('should map user to user dto without role', () => {
      const userInputWithoutRole = { ...USER_INPUT_MOCK, role: undefined };
      const userDto = mapUserToPayloadDto(userInputWithoutRole);

      expect(userDto).toEqual({ ...USER_PAYLOAD_DTO_MOCK, role: undefined });
      expect(userRoleMapper.mapUserRoleToDto).not.toHaveBeenCalled();
    });
  });
});
