import type { UserRole } from '@/modules/shared/domain/models/user-role.model';
import type { UserRoleDto } from '@/modules/shared/infrastructure/dtos/role.dto';

export const ROLE_MAP: Record<UserRoleDto, UserRole> = {
  0: 'OWNER',
  1: 'ADMIN',
};

export const ROLE_DTO_MAP: Record<UserRole, UserRoleDto> = {
  OWNER: 0,
  ADMIN: 1,
};

export const mapUserRoleToModel = (dto: UserRoleDto): UserRole => ROLE_MAP[dto];

export const mapUserRoleToDto = (userRole: UserRole): UserRoleDto => ROLE_DTO_MAP[userRole];
