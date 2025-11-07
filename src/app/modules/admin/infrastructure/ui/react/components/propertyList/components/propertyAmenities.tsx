import { Badge } from '@/components/ui/badge';
import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import { DynamicIcon } from '@/modules/shared/infrastructure/ui/react/components/dynamicIcon/dynamicIcon';

interface PropertyAmenitiesProps {
  amenities: Property['amenities'];
  maxVisible: number;
}

export const PropertyAmenities = ({ amenities = [], maxVisible }: PropertyAmenitiesProps): React.ReactElement => {
  if (!amenities || amenities.length === 0) {
    return <span className="text-xs text-muted-foreground">None</span>;
  }

  return (
    <div className="flex flex-wrap gap-1 max-w-[130px]">
      {amenities.slice(0, maxVisible).map((amenity, index) => (
        <div key={index} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
          <DynamicIcon name={amenity.icon} className="h-3 w-3" />
          <span className="truncate max-w-[60px]">{amenity.name}</span>
        </div>
      ))}
      {amenities.length > maxVisible && (
        <Badge variant="outline" className="text-xs">
          +{amenities.length - maxVisible}
        </Badge>
      )}
    </div>
  );
};
