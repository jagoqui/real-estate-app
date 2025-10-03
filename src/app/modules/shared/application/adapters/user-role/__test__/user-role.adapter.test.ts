import {ROLE_MAP, userRoleAdapter} from '../user-role.adapter';

describe('userRoleAdapter', () => {
  it('should map UserRoleDto to UserRole correctly', () => {
    Object.entries(ROLE_MAP).forEach(([dto, role]) => {
      expect(userRoleAdapter(Number(dto) as keyof typeof ROLE_MAP)).toBe(role);
    });
  });
});
