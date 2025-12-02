import z from 'zod';

export const lucideIconNameSchema = z.custom<LucideIconName>() satisfies z.ZodType<LucideIconName>;
