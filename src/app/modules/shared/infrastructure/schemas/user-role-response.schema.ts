import z from 'zod';
import type { UserRoleDto } from '../dtos/role.dto';

export const userRoleResponseSchema = z.custom<UserRoleDto>();
