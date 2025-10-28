import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { PropertyHeader } from '@/modules/admin/infrastructure/ui/react/components/propertyList/propertyHeader';
import { PropertyTableHeader } from '@/modules/admin/infrastructure/ui/react/components/propertyList/propertyTableHeader';
import { PropertyTableRow } from '@/modules/admin/infrastructure/ui/react/components/propertyList/propertyTableRow';
import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import React from 'react';

interface PropertyListProps {
  properties: Array<Property>;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

const MAX_VISIBLE_FEATURES = 2;
const MAX_VISIBLE_AMENITIES = 3;

export const PropertyList = React.memo(
  ({ properties, searchTerm, onSearchChange, onEdit, onDelete }: PropertyListProps) => {
    const filteredProperties = properties.filter(
      p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Card>
        <CardHeader>
          <PropertyHeader value={searchTerm} onValueChange={onSearchChange} />
        </CardHeader>
        <CardContent className="px-0">
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
  }
);

PropertyList.displayName = 'PropertyList';
