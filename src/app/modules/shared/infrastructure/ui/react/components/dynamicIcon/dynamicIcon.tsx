import type { LucideIconName } from '@/modules/shared/domain/schemas/lucideIcon.schema';
import { type LucideProps, Loader2 } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense, useMemo } from 'react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: LucideIconName;
  fallback?: React.ReactNode;
}

export const DynamicIcon = ({ name, fallback, ...props }: DynamicIconProps): React.ReactElement | null => {
  const iconImport = dynamicIconImports[name];

  const LoadingComponent = useMemo(() => <Loader2 className="animate-spin" {...props} />, [props]);

  if (!iconImport) {
    console.warn(`[v0] Icon "${name}" not found in lucide-react`);
    return fallback ? <>{fallback}</> : null;
  }

  const LazyLucideIcon = lazy(iconImport);

  return (
    <Suspense fallback={LoadingComponent}>
      <LazyLucideIcon {...props} />
    </Suspense>
  );
};
