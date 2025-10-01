import type {UserRole} from '@/modules/shared/domain/schemas/userRole.schema';
import type {UserRoleDto} from '../../dtos/role.dto';

export const ROLE_MAP: Record<UserRoleDto, UserRole> = {
  0: 'OWNER',
  1: 'ADMIN',
};

export const userRoleAdapter = (role: UserRoleDto): UserRole => ROLE_MAP[role];
