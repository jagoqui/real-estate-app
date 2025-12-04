import z from 'zod';
import type { AuthResponseDto } from '../dtos/auth-response.dto';
import { userResponseSchema } from './user-response.schema';

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: userResponseSchema,
}) satisfies z.ZodType<AuthResponseDto>;
