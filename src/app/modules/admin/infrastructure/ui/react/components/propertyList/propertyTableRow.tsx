import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Property } from '@/modules/admin/infrastructure/ui/react/layouts/propertiesManagement/propertiesManagement.layout';
import { PropertyImagesTableCell } from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager/propertyImageManager';
import { Pencil, Trash2 } from 'lucide-react';
import { LocationPreview } from '../locationPreview/locationPreview';
import { PropertyAmenities } from './components/propertyAmenities';
import { PropertyDetails } from './components/propertyDetails';
import { PropertyFeatures } from './components/propertyFeatures';
import { PropertyStatus } from './components/propertyStatus';

interface PropertyTableRowProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  maxVisibleFeatures: number;
  maxVisibleAmenities: number;
}

export const PropertyTableRow = ({
  property,
  onEdit,
  onDelete,
  maxVisibleFeatures,
  maxVisibleAmenities,
}: PropertyTableRowProps): React.ReactElement => {
  return (
    <TableRow>
      <TableCell className="w-[200px] sticky left-0 z-10 bg-background/95 shadow-[2px_0_4px_rgba(0,0,0,0.1)] font-medium">
        <div className="font-medium truncate">{property.name}</div>
        <div className="text-xs text-muted-foreground mt-1 truncate">
          {property.city}, {property.state}
        </div>
      </TableCell>
      <TableCell className="flex-1 p-0">
        <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}>
          <div className="w-[180px] flex-shrink-0 px-4 py-3">
            <LocationPreview property={property} />
          </div>
          <div className="w-[120px] flex-shrink-0 px-4 py-3 font-semibold">${property.price.toLocaleString()}</div>
          <div className="w-[150px] flex-shrink-0 px-4 py-3 text-sm text-muted-foreground">
            <PropertyDetails
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              buildYear={property.buildYear}
            />
          </div>
          <div className="w-[150px] flex-shrink-0 px-4 py-3">
            <PropertyFeatures features={property.highlightedFeatures} maxVisible={maxVisibleFeatures} />
          </div>
          <div className="w-[150px] flex-shrink-0 px-4 py-3">
            <PropertyAmenities amenities={property.amenities} maxVisible={maxVisibleAmenities} />
          </div>
          <div className="w-[120px] flex-shrink-0 px-4 py-3">
            <PropertyImagesTableCell images={property.imageFiles || []} propertyName={property.name} />
          </div>
          <div className="w-[120px] flex-shrink-0 px-4 py-3">{property.ownerName}</div>
          <div className="w-[100px] flex-shrink-0 px-4 py-3">
            <PropertyStatus status={property.status} />
          </div>
        </div>
      </TableCell>
      <TableCell className="w-[100px] sticky right-0 z-10 bg-background/95 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] text-right">
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" onClick={() => onEdit(property)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(property.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
