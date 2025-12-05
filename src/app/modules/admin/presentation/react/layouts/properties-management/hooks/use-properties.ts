import type { Property } from '@/modules/shared/domain/models/property.model';
import { useGetProperties } from '@/modules/shared/presentation/react/hooks/property/use-get-properties/use-get-properties';
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

  const { onGetProperties } = useGetProperties();

  const handleEdit = (property: Property): void => {
    setEditingProperty(property);
    setIsDialogOpen(true);
  };

  const handleReset = (): void => {
    setEditingProperty(null);
    setIsDialogOpen(false);
    onGetProperties();
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
