import React, { useState } from 'react';
import { PropertyDialog } from './components/PropertyDialog';
import { PropertyList } from './components/PropertyList';
import { useProperties } from './hooks/useProperties';

export const PropertiesManagementLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');

  const { properties, editingProperty, deleteProperty, handleSubmit, handleEdit, handleReset } = useProperties();

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
