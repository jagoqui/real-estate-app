import { Badge } from '@/components/ui/badge';
import type { Property } from '@/modules/shared/domain/schemas/property.schema';

interface PropertyFeaturesProps {
  features: Property['highlightedFeatures'];
  maxVisible: number;
}

export const PropertyFeatures = ({ features, maxVisible }: PropertyFeaturesProps): React.ReactElement => {
  return (
    <div className="flex flex-wrap gap-1 max-w-[140px]">
      {features.slice(0, maxVisible).map((feature, index) => (
        <Badge key={index} variant="secondary" className="text-xs">
          {feature}
        </Badge>
      ))}
      {features.length > maxVisible && (
        <Badge variant="outline" className="text-xs">
          +{features.length - maxVisible}
        </Badge>
      )}
    </div>
  );
};
