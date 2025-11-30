import z from 'zod';
import type { UserRole } from '../../domain/models/userRole.model';

export const userRoleSchema: z.ZodType<UserRole> = z.custom<UserRole>();
