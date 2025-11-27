import type { Property } from '@/modules/shared/infrastructure/schemas/property.schema';

interface PropertyDetailsProps {
  bedrooms: Property['bedrooms'];
  bathrooms: Property['bathrooms'];
  area: Property['area'];
  buildYear: Property['buildYear'];
}

export const PropertyDetails = ({ bedrooms, bathrooms, area, buildYear }: PropertyDetailsProps): React.ReactElement => {
  return (
    <>
      <div>
        {bedrooms} beds • {bathrooms} baths
      </div>
      <div className="text-xs mt-1">
        {area}m² • Built {buildYear}
      </div>
    </>
  );
};
