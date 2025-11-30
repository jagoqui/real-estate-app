import type dynamicIconImports from 'lucide-react/dynamicIconImports';
import z from 'zod';

export const lucideIconNameSchema = z.custom<keyof typeof dynamicIconImports>() satisfies z.ZodType<
  keyof typeof dynamicIconImports
>;
