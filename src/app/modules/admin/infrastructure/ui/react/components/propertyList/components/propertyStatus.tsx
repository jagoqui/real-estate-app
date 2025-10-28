import { Badge } from '@/components/ui/badge';
import type { Property } from '@/modules/shared/domain/schemas/property.schema';

const variants = {
  available: 'default',
  sold: 'secondary',
  pending: 'outline',
} as const;

const labels = {
  available: 'Available',
  sold: 'Sold',
  pending: 'Pending',
};

interface PropertyStatusProps {
  status: Property['status'];
}

export const PropertyStatus = ({ status }: PropertyStatusProps): React.ReactElement => {
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};
