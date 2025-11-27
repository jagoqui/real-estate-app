import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { Property } from '@/modules/shared/infrastructure/schemas/property.schema';
import { type PropertyFormValues } from '@/modules/shared/infrastructure/schemas/propertyForm.schema';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const handleOpenChange = (open: boolean): void => {
      if (isSaving) {
        return;
      }

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
        <PropertyDialogContent editingProperty={editingProperty} onReset={onReset} onSavingChange={setIsSaving} />
      </Dialog>
    );
  }
);

PropertyDialog.displayName = 'PropertyDialog';

const DialogLoadingSkeleton = (): React.ReactElement => (
  <DialogContent className="max-h-[90vh] sm:max-w-[600px] min-h-[60vh] overflow-hidden h-auto p-0 flex flex-col">
    <DialogHeader className="flex-shrink-0 bg-background border-b px-6 py-4 rounded-t-lg">
      <DialogTitle className="font-serif text-2xl"> Loading...</DialogTitle>
      <DialogDescription>Loading property details...</DialogDescription>
    </DialogHeader>
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </DialogContent>
);

DialogLoadingSkeleton.displayName = 'DialogLoadingSkeleton';

interface PropertyDialogContentProps {
  editingProperty?: Property | null;
  onReset: () => void;
  onSavingChange: (isSaving: boolean) => void;
}

const PropertyDialogContent = React.memo(({ editingProperty, onReset, onSavingChange }: PropertyDialogContentProps) => {
  const [defaultValues, setDefaultValues] = useState<PropertyFormValues | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(!!editingProperty);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  let buttonText = 'Create Property';
  if (isSaving) {
    buttonText = 'Saving...';
  } else if (editingProperty) {
    buttonText = 'Save Changes';
  }

  useEffect(() => {
    const loadDefaultValues = async (): Promise<void> => {
      if (editingProperty) {
        setIsLoading(true);
        const values = await convertPropertyToFormData(editingProperty);
        setDefaultValues(values);
        setIsLoading(false);
      } else {
        setDefaultValues(undefined);
        setIsLoading(false);
      }
    };

    void loadDefaultValues();
  }, [editingProperty]);

  const handleLoadingChange = (loading: boolean): void => {
    setIsSaving(loading);
    onSavingChange(loading);
  };

  if (isLoading) {
    return <DialogLoadingSkeleton />;
  }

  return (
    <DialogContent
      className="max-h-[90vh] sm:max-w-[600px] min-h-[60vh] overflow-hidden h-auto p-0 flex flex-col"
      onInteractOutside={e => e.preventDefault()}
      onEscapeKeyDown={e => e.preventDefault()}
    >
      <DialogHeader className="flex-shrink-0 bg-background border-b px-6 py-4 rounded-t-lg">
        <DialogTitle className="font-serif text-2xl">{editingProperty ? 'Edit Property' : 'New Property'}</DialogTitle>
        <DialogDescription>
          {editingProperty ? 'Update the property information below.' : 'Fill in the details to add a new property.'}
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <PropertyForm defaultValues={defaultValues} onReset={onReset} onLoadingChange={handleLoadingChange} />
      </div>

      <div className="flex-shrink-0 bg-background border-t px-6 py-4 rounded-b-lg">
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onReset} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" form="property-form" disabled={isSaving}>
            {buttonText}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
});

PropertyDialogContent.displayName = 'PropertyDialogContent';
