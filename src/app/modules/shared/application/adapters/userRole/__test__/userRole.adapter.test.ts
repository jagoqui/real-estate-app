import { ROLE_MAP, userRoleAdapter } from '../userRole.adapter';

describe('userRoleAdapter', () => {
  it('should map UserRoleDto to UserRole correctly', () => {
    Object.entries(ROLE_MAP).forEach(([roleDto, role]) => {
      expect(userRoleAdapter(Number(roleDto) as keyof typeof ROLE_MAP)).toBe(role);
    });
  });
});
