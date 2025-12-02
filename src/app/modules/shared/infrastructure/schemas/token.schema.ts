import z from 'zod';
import type { Token } from '../../domain/models/token.model';

export const tokenSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
}) satisfies z.ZodType<Token>;
