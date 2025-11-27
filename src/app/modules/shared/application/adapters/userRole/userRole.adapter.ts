import type { UserRoleDto } from '@/modules/shared/application/dtos/role.dto';
import type { UserRole } from '@/modules/shared/infrastructure/schemas/userRole.schema';

export const ROLE_MAP: Record<UserRoleDto, UserRole> = {
  0: 'OWNER',
  1: 'ADMIN',
};

export const userRoleAdapter = (role: UserRoleDto): UserRole => ROLE_MAP[role];
