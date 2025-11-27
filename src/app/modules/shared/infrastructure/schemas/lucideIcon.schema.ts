import z from 'zod';
import type { LucideIconName } from '../../domain/models/lucideIconName.model';

export const lucideIconNameSchema: z.ZodType<LucideIconName> = z.custom<LucideIconName>();
