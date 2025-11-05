import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import { useState } from 'react';

export const useProperties = (): {
  editingProperty: Property | null;
  isDialogOpen: boolean;
  handleEdit: (property: Property) => void;
  handleDialogOpen: () => void;
  handleReset: () => void;
} => {
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (property: Property): void => {
    setEditingProperty(property);
  };

  const handleReset = (): void => {
    setEditingProperty(null);
    setIsDialogOpen(false);
  };

  const handleDialogOpen = (): void => {
    setIsDialogOpen(true);
  };

  return {
    editingProperty,
    isDialogOpen,
    handleEdit,
    handleDialogOpen,
    handleReset,
  };
};
