import type dynamicIconImports from 'lucide-react/dynamicIconImports';

declare global {
  type LucideIconName = keyof typeof dynamicIconImports;
}
