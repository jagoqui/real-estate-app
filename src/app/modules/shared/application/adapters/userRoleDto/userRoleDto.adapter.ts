import type { UserRoleDto } from '@/modules/shared/application/dtos/role.dto';
import type { UserRole } from '@/modules/shared/infrastructure/schemas/userRole.schema';

export const ROLE_DTO_MAP: Record<UserRole, UserRoleDto> = {
  OWNER: 0,
  ADMIN: 1,
};

export const userRoleDtoAdapter = (role: UserRole): UserRoleDto => ROLE_DTO_MAP[role];
