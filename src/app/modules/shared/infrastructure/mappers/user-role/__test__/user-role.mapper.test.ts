import { ROLE_DTO_MAP, ROLE_MAP, mapUserRoleToDto, mapUserRoleToModel } from '../user-role.mapper';

describe('mapUserRole', () => {
  it('should map UserRoleDto to UserRole correctly', () => {
    Object.entries(ROLE_MAP).forEach(([roleDto, role]) => {
      expect(mapUserRoleToModel(Number(roleDto) as keyof typeof ROLE_MAP)).toBe(role);
    });
  });

  it('should map UserRole to UserRoleDto correctly', () => {
    Object.entries(ROLE_DTO_MAP).forEach(([role, roleDto]) => {
      expect(mapUserRoleToDto(role as keyof typeof ROLE_DTO_MAP)).toBe(roleDto);
    });
  });
});
