import type { UserRole } from '@/modules/shared/domain/models/userRole.model';
import type { UserRoleDto } from '@/modules/shared/infrastructure/dtos/role.dto';

export const ROLE_MAP: Record<UserRoleDto, UserRole> = {
  0: 'OWNER',
  1: 'ADMIN',
};

export const userRoleAdapter = (role: UserRoleDto): UserRole => ROLE_MAP[role];
