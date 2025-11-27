import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { PropertyHeader } from '@/modules/admin/infrastructure/ui/react/components/propertyList/propertyHeader';
import { PropertyTableHeader } from '@/modules/admin/infrastructure/ui/react/components/propertyList/propertyTableHeader';
import { PropertyTableRow } from '@/modules/admin/infrastructure/ui/react/components/propertyList/propertyTableRow';
import type { Property } from '@/modules/shared/infrastructure/schemas/property.schema';
import { useDeletePropertyRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useDeletePropertyRequest/useDeletePropertyRequest';
import { useGetPropertiesRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useGetProperties/useGetPropertiesRequest';
import React, { useState } from 'react';

interface PropertyListProps {
  onEdit: (property: Property) => void;
}

const MAX_VISIBLE_FEATURES = 2;
const MAX_VISIBLE_AMENITIES = 3;

const filterProperties = (properties: Array<Property>, searchTerm: string): Array<Property> => {
  return properties.filter(
    p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const PropertyList = React.memo(({ onEdit }: PropertyListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    onGetProperties,
    isPending: isLoadingProperties,
    error: propertiesError,
    data: properties,
  } = useGetPropertiesRequest();

  const {
    onDeleteProperty,
    isPending: isDeletingProperty,
    error: deleteError,
  } = useDeletePropertyRequest({
    onSuccess: onGetProperties,
  });

  const isLoading = isLoadingProperties || isDeletingProperty;
  const error = propertiesError || deleteError;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!properties?.length) {
    return <div>No properties found.</div>;
  }

  const filteredProperties = filterProperties(properties, searchTerm);

  const onDelete = (propertyId: string): void => {
    void onDeleteProperty({ propertyId });
  };

  return (
    <Card className="w-fit grid place-items-center mx-auto px-5">
      <CardHeader className="w-full px-5">
        <PropertyHeader value={searchTerm} onValueChange={setSearchTerm} />
      </CardHeader>
      <CardContent className="px-5">
        <div className="w-full overflow-hidden">
          <div className="max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-20rem)]">
            <Table className="w-full">
              <PropertyTableHeader />
              <TableBody>
                {filteredProperties.map(property => (
                  <PropertyTableRow
                    key={property.id}
                    property={property}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    maxVisibleFeatures={MAX_VISIBLE_FEATURES}
                    maxVisibleAmenities={MAX_VISIBLE_AMENITIES}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PropertyList.displayName = 'PropertyList';
