import React from 'react';
import { PropertyDialog } from './components/PropertyDialog';
import { PropertyList } from './components/PropertyList';
import { useProperties } from './hooks/useProperties';

export const PropertiesManagementLayout = (): React.ReactElement => {
  const { editingProperty, isDialogOpen, handleEdit, handleDialogOpen, handleReset } = useProperties();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold">Properties</h2>
          <p className="mt-2 text-sm lg:text-base text-muted-foreground">Manage all properties on your platform</p>
        </div>
        <PropertyDialog
          isDialogOpen={isDialogOpen}
          editingProperty={editingProperty}
          handleDialogOpen={handleDialogOpen}
          onReset={handleReset}
        />
      </div>

      <PropertyList onEdit={handleEdit} />
    </div>
  );
};
