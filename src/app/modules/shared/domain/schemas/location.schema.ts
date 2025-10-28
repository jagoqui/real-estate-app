import z from 'zod';

export const locationSchema = z.object({
  lat: z.string(),
  lon: z.string(),
});

export type Location = z.infer<typeof locationSchema>;
