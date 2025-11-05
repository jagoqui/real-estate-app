import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import { type PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { Plus } from 'lucide-react';
import React from 'react';
import { convertPropertyToFormData } from '../helpers/convertPropertyToFormData';
import { PropertyForm } from './PropertyForm';

interface PropertyDialogProps {
  editingProperty?: Property | null;
  isDialogOpen: boolean;
  handleDialogOpen: () => void;
  onReset: () => void;
}

export const PropertyDialog = React.memo(
  ({ editingProperty, isDialogOpen, handleDialogOpen, onReset }: PropertyDialogProps) => {
    const handleOpenChange = (open: boolean): void => {
      if (open) {
        handleDialogOpen();
        return;
      }
      onReset();
    };

    return (
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Property</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </DialogTrigger>
        <PropertyDialogContent editingProperty={editingProperty} onReset={onReset} />
      </Dialog>
    );
  }
);

PropertyDialog.displayName = 'PropertyDialog';

interface PropertyDialogContentProps {
  editingProperty?: Property | null;
  onReset: () => void;
}

const PropertyDialogContent = React.memo(({ editingProperty, onReset }: PropertyDialogContentProps) => {
  const defaultValues: Partial<PropertyFormValues> | undefined = editingProperty
    ? convertPropertyToFormData(editingProperty)
    : undefined;

  return (
    <DialogContent
      className="max-h-[90vh] sm:max-w-[600px] min-h-[60vh] overflow-hidden h-auto p-0 flex flex-col"
      onInteractOutside={e => e.preventDefault()}
    >
      <DialogHeader className="flex-shrink-0 bg-background border-b px-6 py-4 rounded-t-lg">
        <DialogTitle className="font-serif text-2xl">{editingProperty ? 'Edit Property' : 'New Property'}</DialogTitle>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <PropertyForm defaultValues={defaultValues} onReset={onReset} />
      </div>

      <div className="flex-shrink-0 bg-background border-t px-6 py-4 rounded-b-lg">
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onReset}>
            Cancel
          </Button>
          <Button type="submit" form="property-form">
            {editingProperty ? 'Save Changes' : 'Create Property'}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
});

PropertyDialogContent.displayName = 'PropertyDialogContent';
