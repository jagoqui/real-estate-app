import { Badge } from '@/components/ui/badge';
import { type PropertyStatus } from '@/modules/shared/domain/models/property-statutes.model';

const variants: Readonly<Record<PropertyStatus, Parameters<typeof Badge>[0]['variant']>> = {
  AVAILABLE: 'default',
  SOLD: 'secondary',
  PENDING: 'outline',
};

interface PropertyStatusProps {
  status: PropertyStatus;
}

export const PropertyStatus = ({ status }: PropertyStatusProps): React.ReactElement => {
  return <Badge variant={variants[status]}>{status}</Badge>;
};
