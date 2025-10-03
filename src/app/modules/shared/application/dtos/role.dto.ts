import type { UserRole } from '@/modules/shared/domain/schemas/userRole.schema';

export const USER_ROLES_DTO = {
  OWNER: 0,
  ADMIN: 1,
} as const satisfies Readonly<Record<UserRole, number>>;

export type UserRoleDto = (typeof USER_ROLES_DTO)[keyof typeof USER_ROLES_DTO];
