import React, { useState } from 'react';
import { PropertyDialog } from './components/PropertyDialog';
import { PropertyList } from './components/PropertyList';
import { createPropertyFromFormData } from './helpers/propertyFormHelpers';
import { useProperties } from './hooks/useProperties';
import { usePropertyForm } from './hooks/usePropertyForm';
import { type Property } from './types/property.types';

export { type Owner, type Property } from './types/property.types';

export const PropertiesManagementLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
  const {
    formData,
    editingProperty,
    isAmenityFormValid,
    pendingImageDeletions,
    handleFormChange,
    resetForm,
    loadPropertyForEdit,
  } = usePropertyForm();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const newProperty = createPropertyFromFormData(formData, editingProperty, pendingImageDeletions);

    if (editingProperty) {
      updateProperty(newProperty);
    } else {
      addProperty(newProperty);
    }
  };

  const handleEdit = (property: Property): void => {
    loadPropertyForEdit(property);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold">Properties</h2>
          <p className="mt-2 text-sm lg:text-base text-muted-foreground">Manage all properties on your platform</p>
        </div>
        <PropertyDialog
          formData={formData}
          editingProperty={editingProperty}
          isAmenityFormValid={isAmenityFormValid}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          onReset={resetForm}
        />
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
