import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Property } from '@/modules/shared/infrastructure/schemas/property.schema';
import { ConfirmAlert } from '@/modules/shared/infrastructure/ui/react/components/confirmAlert/confirmAlert';
import { PropertyImagesTableCell } from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager';
import { Award, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
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

// eslint-disable-next-line max-lines-per-function
export const PropertyTableRow = ({
  property,
  onEdit,
  onDelete,
  maxVisibleFeatures,
  maxVisibleAmenities,
}: PropertyTableRowProps): React.ReactElement => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleDelete = (propertyId: string): void => {
    setDeletingId(propertyId);
    setIsDeleteConfirmOpen(true);
  };

  const onConfirmDelete = (): void => {
    if (deletingId) {
      void onDelete(deletingId);
    }
  };

  const onCancelDelete = (): void => {
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  return (
    <>
      <TableRow>
        <TableCell className="w-[200px] sticky left-0 z-10 bg-background/95 shadow-[2px_0_4px_rgba(0,0,0,0.1)] font-medium">
          <div className="font-medium truncate">{property.name}</div>
          <div className="text-xs text-muted-foreground mt-1 truncate">
            {property.city}, {property.state}
          </div>
          {property.featured && (
            <div className="group relative inline-block mt-1">
              <Award size={20} fill="#FFD700" />
              <span className="invisible group-hover:visible absolute left-0 top-full mt-1 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg">
                Featured Property
              </span>
            </div>
          )}
        </TableCell>
        <TableCell className="flex-1 p-0">
          <div
            className="flex overflow-x-auto"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
          >
            <div className="w-[180px] flex-shrink-0 px-4 py-3">
              <LocationPreview property={property} />
            </div>
            <div className="w-[150px] flex-shrink-0 px-4 py-3">
              <b>{property.type}</b>
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
              <PropertyImagesTableCell images={property.images} propertyName={property.name} />
            </div>
            <div className="w-[120px] flex-shrink-0 px-4 py-3 overflow-hidden text-ellipsis">{property.ownerId}</div>
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
            <Button variant="ghost" size="icon" onClick={() => handleDelete(property.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <ConfirmAlert isOpen={isDeleteConfirmOpen} onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
    </>
  );
};
