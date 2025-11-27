import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Owner } from '@/modules/shared/infrastructure/schemas/owner.schema';
import { ConfirmAlert } from '@/modules/shared/infrastructure/ui/react/components/confirmAlert/confirmAlert';
import { useDeleteOwnerRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useDeleteOwnerRequest/useDeleteOwnerRequest';
import { useGetOwnersRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useGetOwnersRequest/useGetOwnersRequest';
import { Home, Mail, Pencil, Phone, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { OwnerManagementDialog } from '../../components/ownerManagementDialog/ownerManagementDialog';

// eslint-disable-next-line max-lines-per-function
export const OwnersManagementLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { onGetOwners, isPending: isPendingOwners, error: ownersError, data: owners } = useGetOwnersRequest();

  const {
    onDeleteOwner,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteOwnerRequest({
    onSuccess: () => void onGetOwners(),
  });

  const isLoading = isPendingOwners || isPendingDelete;
  const error = ownersError || deleteError;

  if (isLoading) {
    return <div>Loading owners...</div>;
  }

  if (!owners) {
    return <div className="text-destructive">No owners data available.</div>;
  }

  const handleEdit = (owner: Owner): void => {
    setEditingOwner(owner);
    setTimeout(() => {
      setIsDialogOpen(true);
    });
  };

  const handleDelete = (ownerId: string): void => {
    setDeletingId(ownerId);
    setIsDeleteConfirmOpen(true);
  };

  const onConfirmDelete = (): void => {
    if (deletingId) {
      void onDeleteOwner({
        id: deletingId,
      });
    }
  };

  const onCancelDelete = (): void => {
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  const filteredOwners = owners.filter(
    o =>
      o.id === searchTerm ||
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.email && o.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (o.phone && o.phone.includes(searchTerm))
  );

  return (
    <>
      <ConfirmAlert isOpen={isDeleteConfirmOpen} onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Owners</h2>
            <p className="mt-2 text-muted-foreground">Manage the owners of the properties</p>
          </div>
        </div>
        {error && <div className="text-destructive">Error loading owners: {error.message}</div>}
        <OwnerManagementDialog
          key={editingOwner ? editingOwner.id : 'new-owner'}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          onGetOwners={() => onGetOwners.bind(null)}
          editingOwner={editingOwner}
          setEditingOwner={setEditingOwner}
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Owners</h3>
              <Home className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold">{owners.length}</div>
              <p className="mt-1 text-sm text-muted-foreground">Registered on the platform</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Properties</h3>
              <Home className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold">Calculating...</div>
              <p className="mt-1 text-sm text-muted-foreground">Under management</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Average per Owner</h3>
              <Home className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold">Calculating...</div>
              <p className="mt-1 text-sm text-muted-foreground">Properties</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead>Birthday</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOwners.map(owner => (
                  <TableRow key={owner.id}>
                    <TableCell className="font-medium">{owner.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{owner.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{owner.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{owner.address || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">Calculating...</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {owner.birthday
                        ? new Date(owner.birthday).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {owner.createdAt
                        ? new Date(owner.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(owner)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(owner.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
