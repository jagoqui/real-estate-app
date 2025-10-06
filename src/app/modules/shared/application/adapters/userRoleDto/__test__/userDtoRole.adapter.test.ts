import { ROLE_DTO_MAP, userRoleDtoAdapter } from '../userRoleDto.adapter';

describe('userRoleDtoAdapter', () => {
  it('should map UserRole to UserRoleDto correctly', () => {
    Object.entries(ROLE_DTO_MAP).forEach(([role, roleDto]) => {
      expect(userRoleDtoAdapter(role as keyof typeof ROLE_DTO_MAP)).toBe(roleDto);
    });
  });
});
