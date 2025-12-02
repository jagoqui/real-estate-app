import z from 'zod';
import type { LucideIconName } from '../../domain/models/lucideI-icon-name.command';

export const lucideIconNameSchema = z.custom<LucideIconName>() satisfies z.ZodType<LucideIconName>;
