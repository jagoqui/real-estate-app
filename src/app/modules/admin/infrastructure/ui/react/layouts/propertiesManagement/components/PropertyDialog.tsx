import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { convertPropertyToFormData } from '../helpers/convertPropertyToFormData';
import { type PropertyFormSchema } from '../schemas/propertyForm.schema';
import { type Property } from '../types/property.types';
import { PropertyForm } from './PropertyForm';

interface PropertyDialogProps {
  editingProperty?: Property | null;
  onSubmit: (data: PropertyFormSchema) => void;
  onReset: () => void;
}

export const PropertyDialog = React.memo(({ editingProperty, onSubmit, onReset }: PropertyDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('basic');

  // Open dialog when editingProperty changes
  useEffect(() => {
    if (editingProperty) {
      setIsDialogOpen(true);
    }
  }, [editingProperty]);

  const handleOpenChange = (open: boolean): void => {
    setIsDialogOpen(open);
    if (!open) {
      onReset();
      setActiveTab('basic');
    }
  };

  const handleSubmit = (data: PropertyFormSchema): void => {
    onSubmit(data);
    setIsDialogOpen(false);
    setActiveTab('basic');
  };

  const handleOwnerChange = (ownerId: string, ownerName: string): void => {
    // Owner change handler - can be used to update form state if needed
    void ownerId;
    void ownerName;
  };

  const defaultValues: Partial<PropertyFormSchema> | undefined = editingProperty
    ? convertPropertyToFormData(editingProperty)
    : undefined;

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Property</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </DialogTrigger>
      <PropertyDialogContent
        editingProperty={editingProperty}
        defaultValues={defaultValues}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSubmit={handleSubmit}
        onOwnerChange={handleOwnerChange}
        onCancel={() => {
          setIsDialogOpen(false);
          onReset();
          setActiveTab('basic');
        }}
      />
    </Dialog>
  );
});

PropertyDialog.displayName = 'PropertyDialog';

// Extracted dialog content component
interface PropertyDialogContentProps {
  editingProperty?: Property | null;
  defaultValues: Partial<PropertyFormSchema> | undefined;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSubmit: (data: PropertyFormSchema) => void;
  onOwnerChange: (ownerId: string, ownerName: string) => void;
  onCancel: () => void;
}

const PropertyDialogContent = React.memo(
  ({
    editingProperty,
    defaultValues,
    activeTab,
    onTabChange,
    onSubmit,
    onOwnerChange,
    onCancel,
  }: PropertyDialogContentProps) => (
    <DialogContent
      className="max-h-[90vh] sm:max-w-[600px] min-h-[60vh] overflow-hidden h-auto p-0 flex flex-col"
      onInteractOutside={e => e.preventDefault()}
    >
      <DialogHeader className="flex-shrink-0 bg-background border-b px-6 py-4 rounded-t-lg">
        <DialogTitle className="font-serif text-2xl">{editingProperty ? 'Edit Property' : 'New Property'}</DialogTitle>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <PropertyForm
          defaultValues={defaultValues}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onSubmit={onSubmit}
          onOwnerChange={onOwnerChange}
        />
      </div>

      <div className="flex-shrink-0 bg-background border-t px-6 py-4 rounded-b-lg">
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" form="property-form">
            {editingProperty ? 'Save Changes' : 'Create Property'}
          </Button>
        </div>
      </div>
    </DialogContent>
  )
);

PropertyDialogContent.displayName = 'PropertyDialogContent';
