import type { Property } from '@/modules/shared/domain/models/property.model';
import { useGetPropertiesRequest } from '@/modules/shared/infrastructure/ui/react/hooks/use-get-properties-request/use-get-properties-request';
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

  const { onGetProperties } = useGetPropertiesRequest();

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
