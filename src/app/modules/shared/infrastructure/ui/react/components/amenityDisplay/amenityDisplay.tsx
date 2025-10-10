import { DynamicIcon, type LucideIconName } from '../dynamicIcon/dynamicIcon';

export interface Amenity {
  id: string;
  name: string;
  icon: LucideIconName;
}

interface AmenityDisplayProps {
  amenities: Array<Amenity>;
}

export const AmenityDisplay = ({ amenities }: AmenityDisplayProps): React.ReactElement => {
  if (amenities.length === 0) {
    return <div className="text-sm text-muted-foreground">No amenities available</div>;
  }

  return (
    <div className="space-y-2">
      {amenities.map(amenity => (
        <div key={amenity.id} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <DynamicIcon name={amenity.icon} className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium">{amenity.name}</span>
        </div>
      ))}
    </div>
  );
};
