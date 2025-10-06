import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreateOwner, Owner } from '@/modules/shared/domain/schemas/owner.schema';
import { useCreateOwnerRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useCreateOwnerRequest/useCreateOwnerRequest';
import { useUpdateOwnerRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useUpdateOwnerRequest/useUpdateOwnerRequest';

import { Plus } from 'lucide-react';
import { useState } from 'react';

interface OwnerManagementDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  setEditingOwner: (owner: Owner | null) => void;
  onGetOwners: VoidFunction;
  editingOwner?: Owner | null;
}

const getInitialFormData = (owner: OwnerManagementDialogProps['editingOwner']): CreateOwner => ({
  name: owner?.name || '',
  email: owner?.email || '',
  phone: owner?.phone || '',
  address: owner?.address || '',
  birthday: owner?.birthday || '',
});

// eslint-disable-next-line max-lines-per-function
export const OwnerManagementDialog = ({
  isDialogOpen,
  editingOwner,
  setIsDialogOpen,
  setEditingOwner,
  onGetOwners,
}: OwnerManagementDialogProps): React.ReactElement => {
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
      onUpdateOwner({
        ...editingOwner,
        ...formData,
      });
      return;
    }

    void onCreateOwner(formData);
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onOpenChange={open => {
          setIsDialogOpen(open);
          if (!open) onResetForm();
        }}
      >
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Owner
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]" onInteractOutside={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{editingOwner ? 'Edit Owner' : 'New Owner'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={e => setFormData({ ...formData, birthday: e.target.value })}
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">Error: {error.message}</p>}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onResetForm} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : buttonText}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
