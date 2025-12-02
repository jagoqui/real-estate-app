import type { LucideIconName } from '@/modules/shared/domain/models/lucideI-icon-name.command';
import { type LucideProps, Loader2 } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: LucideIconName;
  fallback?: React.ReactNode;
}

export const DynamicIcon = ({ name, fallback, ...props }: DynamicIconProps): React.ReactElement | null => {
  const iconImport = dynamicIconImports[name];

  if (!iconImport) {
    console.warn(`[v0] Icon "${name}" not found in lucide-react`);
    return fallback ? <>{fallback}</> : null;
  }

  const LazyLucideIcon = lazy(iconImport);

  return (
    <Suspense fallback={<Loader2 className="animate-spin" {...props} />}>
      <LazyLucideIcon {...props} />
    </Suspense>
  );
};
