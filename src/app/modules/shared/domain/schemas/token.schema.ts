import z from 'zod';

export const tokenSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type Token = z.infer<typeof tokenSchema>;
