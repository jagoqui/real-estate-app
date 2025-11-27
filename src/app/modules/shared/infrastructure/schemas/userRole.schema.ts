import z from 'zod';

export const USER_ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
} as const satisfies Readonly<Record<string, string>>;

export const userRoleSchema = z.custom<(typeof USER_ROLES)[keyof typeof USER_ROLES]>();

export type UserRole = z.infer<typeof userRoleSchema>;
