import type { UserRoleDto } from '@/modules/shared/application/dtos/role.dto';
import type { UserRole } from '@/modules/shared/domain/models/userRole.model';

export const ROLE_DTO_MAP: Record<UserRole, UserRoleDto> = {
  OWNER: 0,
  ADMIN: 1,
};

export const userRoleDtoAdapter = (role: UserRole): UserRoleDto => ROLE_DTO_MAP[role];
