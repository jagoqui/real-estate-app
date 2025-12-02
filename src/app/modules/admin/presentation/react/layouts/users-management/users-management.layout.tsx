import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ConfirmAlert } from '@/modules/shared//presentation/react/components/confirm-alert/confirm-alert';
import { useDeleteUser } from '@/modules/shared//presentation/react/hooks/users/use-delete-user/use-delete-user';
import { useGetUsers } from '@/modules/shared//presentation/react/hooks/users/use-get-users/use-get-users';
import { USER_ROLES } from '@/modules/shared/domain/models/user-role.model';
import type { User } from '@/modules/shared/domain/models/user.model';
import { Crown, Mail, Pencil, Phone, Search, Shield, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { UserManagementDialog } from '../../components/user-management-dialog/user-management-dialog';

// eslint-disable-next-line max-lines-per-function
export const UsersManagementLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { onRefetchGetUsers, isPending: isPendingUsers, error: usersError, data: users } = useGetUsers();

  const onDeleteSuccess = (): void => {
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
    void onRefetchGetUsers();
  };

  const {
    onDeleteUser,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteUser({
    onSuccess: onDeleteSuccess,
  });

  const isLoading = isPendingUsers || isPendingDelete;
  const error = usersError || deleteError;

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (!users) {
    return <div className="text-destructive">No users data available.</div>;
  }

  const handleEdit = (user: User): void => {
    setEditingUser(user);
    setTimeout(() => {
      setIsDialogOpen(true);
    });
  };

  const handleDelete = (userId: string): void => {
    setDeletingId(userId);
    setIsDeleteConfirmOpen(true);
  };

  const onConfirmDelete = (): void => {
    if (deletingId) {
      void onDeleteUser({
        userId: deletingId,
      });
    }
  };

  const onCancelDelete = (): void => {
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  const filteredUsers = users.filter(
    u =>
      u.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.role && u.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.phone && u.phone.includes(searchTerm))
  );

  const getInitials = (name: string): string => {
    const MAX_INITIALS = 2;
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, MAX_INITIALS);
  };

  const getRoleIcon = (role: string): React.ReactElement => {
    return role === USER_ROLES.ADMIN ? (
      <Crown className="h-4 w-4 text-yellow-500" />
    ) : (
      <Shield className="h-4 w-4 text-blue-500" />
    );
  };

  const getRoleBadge = (role: string): React.ReactElement => {
    return role === USER_ROLES.ADMIN ? (
      <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
        <Crown className="h-3 w-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
        <Shield className="h-3 w-3 mr-1" />
        Owner
      </Badge>
    );
  };

  const totalUsers = users.length;
  const googleUsers = users.filter(user => user.googleId).length;
  const emailUsers = users.filter(user => !user.googleId).length;

  return (
    <>
      <ConfirmAlert isOpen={isDeleteConfirmOpen} onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Users</h2>
            <p className="mt-2 text-muted-foreground">Manage system users and their permissions</p>
          </div>
        </div>
        {error && <div className="text-destructive">Error loading users: {error.message}</div>}
        <UserManagementDialog
          key={editingUser ? editingUser.id : 'new-user'}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          onRefetchUsers={onRefetchGetUsers}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          getInitials={getInitials}
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold">{totalUsers}</div>
              <p className="mt-1 text-sm text-muted-foreground">Registered on the platform</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Google Login Users</h3>
              <Crown className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold">{googleUsers}</div>
              <p className="mt-1 text-sm text-muted-foreground">Users with Google ID</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Email Users</h3>
              <Mail className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold">{emailUsers}</div>
              <p className="mt-1 text-sm text-muted-foreground">Users without Google ID</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, email, name, role or phone..."
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
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Bio</TableHead>
                  <TableHead>Login Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.photoUrl} alt={user.name || 'User'} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {getInitials(user.name || user.email || 'User')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name || 'No name'}</div>
                          <div className="text-sm text-muted-foreground">{user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        {getRoleBadge(user.role)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.phone ? (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{user.phone}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">{user.bio || 'N/A'}</TableCell>
                    <TableCell>
                      {user.googleId ? (
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          <Crown className="h-3 w-3 mr-1" />
                          Google
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-50 text-gray-700 border-gray-200">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(user.id)}
                          disabled={user.isAdmin}
                        >
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
