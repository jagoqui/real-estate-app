import { Badge } from '@/components/ui/badge';
import { type PropertyStatutes } from '@/modules/shared/infrastructure/schemas/propertyStatutes.schema';

const variants: Readonly<Record<PropertyStatutes, Parameters<typeof Badge>[0]['variant']>> = {
  AVAILABLE: 'default',
  SOLD: 'secondary',
  PENDING: 'outline',
};

interface PropertyStatusProps {
  status: PropertyStatutes;
}

export const PropertyStatus = ({ status }: PropertyStatusProps): React.ReactElement => {
  return <Badge variant={variants[status]}>{status}</Badge>;
};
