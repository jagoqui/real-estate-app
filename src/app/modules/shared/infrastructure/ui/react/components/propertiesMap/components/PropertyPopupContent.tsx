import { Button } from '@/components/ui/button';
import type { Property } from '@/modules/shared/infrastructure/schemas/property.schema';
import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { Link } from '@tanstack/react-router';
import { Bath, Bed, DollarSign, MapPin, Maximize2 } from 'lucide-react';
import React from 'react';

interface PropertyPopupContentProps {
  property: Property;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

export const PropertyPopupContent = ({ property }: PropertyPopupContentProps): React.ReactElement => {
  return (
    <div className="space-y-3 p-1">
      {/* Image */}
      {property.coverImage && (
        <div className="relative w-full h-40 rounded-md overflow-hidden bg-muted">
          <img src={property.coverImage} alt={property.name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
            {formatPrice(property.price)}
          </div>
        </div>
      )}

      {/* Property Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-base line-clamp-1">{property.name}</h3>

        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="line-clamp-1">
            {property.address}, {property.city}
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-3 w-3 mr-1" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-3 w-3 mr-1" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <Maximize2 className="h-3 w-3 mr-1" />
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* Description */}
        {property.description && <p className="text-xs text-muted-foreground line-clamp-2">{property.description}</p>}

        {/* View Details Button */}
        <Link
          to={PATHNAME_ROUTES.PROPERTY_DETAILS}
          params={{ propertyId: property.id }}
          className="inline-block w-full"
        >
          <Button className="w-full" size="sm">
            <DollarSign className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
