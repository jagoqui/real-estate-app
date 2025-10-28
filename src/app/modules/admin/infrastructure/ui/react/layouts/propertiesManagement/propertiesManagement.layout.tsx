import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import { type PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import React, { useState } from 'react';
import { PropertyDialog } from './components/PropertyDialog';
import { PropertyList } from './components/PropertyList';
import { useProperties } from './hooks/useProperties';

export const PropertiesManagementLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();

  const handleSubmit = (data: PropertyFormValues): void => {
    const newProperty: Property = {
      id: data.id,
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      location: { lat: '', lon: '' },
      price: Number(data.price),
      bedrooms: Number(data.bedrooms),
      bathrooms: Number(data.bathrooms),
      area: Number(data.area),
      buildYear: Number(data.buildYear),
      description: data.description,
      highlightedFeatures: data.highlightedFeatures,
      amenities: data.amenities,
      images: 'images' in data ? data.images : [],
      views380Url: data.views380Url,
      ownerId: data.ownerId,
      ownerName: data.ownerName,
      status: data.status,
      type: data.type,
      featured: false,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    if (editingProperty) {
      updateProperty(newProperty);
    } else {
      addProperty(newProperty);
    }

    setEditingProperty(null);
  };

  const handleEdit = (property: Property): void => {
    setEditingProperty(property);
  };

  const handleReset = (): void => {
    setEditingProperty(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold">Properties</h2>
          <p className="mt-2 text-sm lg:text-base text-muted-foreground">Manage all properties on your platform</p>
        </div>
        <PropertyDialog editingProperty={editingProperty} onSubmit={handleSubmit} onReset={handleReset} />
      </div>

      <PropertyList
        properties={properties}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onEdit={handleEdit}
        onDelete={deleteProperty}
      />
    </div>
  );
};
