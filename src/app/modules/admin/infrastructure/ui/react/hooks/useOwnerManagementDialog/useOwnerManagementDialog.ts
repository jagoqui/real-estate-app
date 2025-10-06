import type { CreateOwner, Owner } from '@/modules/shared/domain/schemas/owner.schema';
import { useCreateOwnerRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useCreateOwnerRequest/useCreateOwnerRequest';
import { useUpdateOwnerRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useUpdateOwnerRequest/useUpdateOwnerRequest';
import { useState } from 'react';

const getInitialFormData = (owner?: Owner | null): CreateOwner => ({
  name: owner?.name || '',
  email: owner?.email || '',
  phone: owner?.phone || '',
  address: owner?.address || '',
  birthday: owner?.birthday || '',
});

interface UseOwnerManagementDialogProps {
  setEditingOwner: (owner: Owner | null) => void;
  onGetOwners: VoidFunction;
  setIsDialogOpen: (open: boolean) => void;
  editingOwner?: Owner | null;
}

interface UseOwnerManagementDialogReturn {
  formData: CreateOwner;
  isLoading: boolean;
  error: Error | null;
  buttonText: string;
  onResetForm: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFormData: React.Dispatch<React.SetStateAction<CreateOwner>>;
}

export const useOwnerManagementDialog = ({
  setEditingOwner,
  onGetOwners,
  setIsDialogOpen,
  editingOwner,
}: UseOwnerManagementDialogProps): UseOwnerManagementDialogReturn => {
  const initialOwnerData = getInitialFormData(editingOwner);
  const [formData, setFormData] = useState<CreateOwner>(initialOwnerData);

  const onEditSuccess = (): void => {
    onResetForm();
    onGetOwners();
  };

  const onResetForm = (): void => {
    setEditingOwner(null);
    setFormData(initialOwnerData);
    setIsDialogOpen(false);
  };

  const {
    onCreateOwner,
    isPending: isPendingCreate,
    error: createError,
  } = useCreateOwnerRequest({
    onSuccess: onEditSuccess,
  });

  const {
    onUpdateOwner,
    isPending: isPendingUpdate,
    error: updateError,
  } = useUpdateOwnerRequest({
    onSuccess: onEditSuccess,
  });

  const isLoading = isPendingCreate || isPendingUpdate;
  const error = createError || updateError;

  const buttonText = editingOwner ? 'Save Changes' : 'Create Owner';

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (editingOwner) {
      const updatedOwner: Owner = {
        ...editingOwner,
        ...formData,
      } as Owner;

      onUpdateOwner(updatedOwner);
      return;
    }

    void onCreateOwner(formData);
  };

  return {
    formData,
    onResetForm,
    handleSubmit,
    setFormData,
    isLoading,
    error,
    buttonText,
  };
};
