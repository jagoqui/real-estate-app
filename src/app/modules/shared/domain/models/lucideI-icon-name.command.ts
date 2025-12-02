import type dynamicIconImports from 'lucide-react/dynamicIconImports';

//FIXME: Ver la forma de imoportar el tipo sin romper la regla de dependencias en la arquitectura

export type LucideIconName = keyof typeof dynamicIconImports;
