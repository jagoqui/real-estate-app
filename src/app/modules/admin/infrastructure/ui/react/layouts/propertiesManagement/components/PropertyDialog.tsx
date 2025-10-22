import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { type PropertyFormData } from '../hooks/usePropertyForm';
import { type Property } from '../types/property.types';
import { PropertyForm } from './PropertyForm';

interface PropertyDialogProps {
  formData: PropertyFormData;
  editingProperty: Property | null;
  isAmenityFormValid: boolean;
  onFormChange: (updates: Partial<PropertyFormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export const PropertyDialog = React.memo(
  ({ formData, editingProperty, isAmenityFormValid, onFormChange, onSubmit, onReset }: PropertyDialogProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('basic');

    const handleOpenChange = (open: boolean): void => {
      setIsDialogOpen(open);
      if (!open) {
        onReset();
        setActiveTab('basic');
      }
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
        <DialogContent
          className="max-h-[90vh] sm:max-w-[600px] min-h-[60vh] overflow-hidden h-auto p-0 flex flex-col"
          onInteractOutside={e => e.preventDefault()}
        >
          <DialogHeader className="flex-shrink-0 bg-background border-b px-6 py-4 rounded-t-lg">
            <DialogTitle className="font-serif text-2xl">
              {editingProperty ? 'Edit Property' : 'New Property'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <PropertyForm
              formData={formData}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onFormChange={onFormChange}
              onSubmit={onSubmit}
            />
          </div>

          <div className="flex-shrink-0 bg-background border-t px-6 py-4 rounded-b-lg">
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  onReset();
                  setActiveTab('basic');
                }}
              >
                Cancel
              </Button>
              <Button type="submit" form="property-form" disabled={!isAmenityFormValid}>
                {editingProperty ? 'Save Changes' : 'Create Property'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

PropertyDialog.displayName = 'PropertyDialog';
