import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Owner } from '@/modules/shared/domain/models/owner.model';

import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { useGetUsersWithoutOwnerRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useGetUsersWithoutOwnerRequest/useGetUsersWithoutOwnerRequest';
import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useOwnerManagementDialog } from '../../hooks/useOwnerManagementDialog/useOwnerManagementDialog';

interface OwnerManagementDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  setEditingOwner: (owner: Owner | null) => void;
  onGetOwners: VoidFunction;
  editingOwner?: Owner | null;
}

// eslint-disable-next-line max-lines-per-function
export const OwnerManagementDialog = ({
  isDialogOpen,
  editingOwner,
  setIsDialogOpen,
  setEditingOwner,
  onGetOwners,
}: OwnerManagementDialogProps): React.ReactElement => {
  const { formData, onResetForm, handleSubmit, setFormData, isLoading, error, buttonText } = useOwnerManagementDialog({
    setEditingOwner,
    onGetOwners,
    setIsDialogOpen,
    editingOwner,
  });
  const { isPending, error: userError, data: usersWithoutOwner } = useGetUsersWithoutOwnerRequest();

  const availableUsers = usersWithoutOwner ? [...usersWithoutOwner] : [];
  if (editingOwner?.userId && usersWithoutOwner) {
    const userIds = new Set(usersWithoutOwner.map(user => user.id));
    if (!userIds.has(editingOwner.userId)) {
      availableUsers.push({
        id: editingOwner.userId,
        email: `Current User (${editingOwner.userId})`,
        role: 'OWNER',
        isAdmin: false,
      });
    }
  }

  if (isPending) {
    return <div>Loading users...</div>;
  }

  if (userError) {
    return <div>Error loading users: {userError.message}</div>;
  }

  if (!availableUsers?.length && !editingOwner) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-6">
        <p className="text-center text-lg font-medium">
          There are no users available to associate with owners. Please create a user first.
        </p>
        <Link to={PATHNAME_ROUTES.ADMIN_USERS} className="text-blue-600 underline">
          Create User
        </Link>
      </div>
    );
  }

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
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Select
                  value={formData.userId || undefined}
                  onValueChange={(value: string) => setFormData({ ...formData, userId: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select User ID" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers?.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.id} - {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
