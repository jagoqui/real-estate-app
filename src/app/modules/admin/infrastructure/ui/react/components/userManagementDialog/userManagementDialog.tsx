import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { CreateUser, User } from '@/modules/shared/domain/schemas/user.schema';
import { USER_ROLES } from '@/modules/shared/domain/schemas/userRole.schema';
import { useCreateUserRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useCreateUserRequest/useCreateUserRequest';
import { useUpdateUserRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useUpdateUserRequest/useUpdateUserRequest';
import { Camera, Loader2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';

interface UserManagementDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  setEditingUser: (user: User | null) => void;
  onRefetchUsers: () => Promise<void>;
  editingUser?: User | null;
  getInitials: (name: string) => string;
}

const DEFAULT_CREATE_USER: CreateUser = {
  name: '',
  email: '',
  role: USER_ROLES.OWNER,
  password: 'DefaultPassword123!',
};

// eslint-disable-next-line max-lines-per-function, complexity
export const UserManagementDialog = ({
  isDialogOpen,
  editingUser,
  setIsDialogOpen,
  setEditingUser,
  onRefetchUsers,
  getInitials,
}: UserManagementDialogProps): React.ReactElement => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form data for create
  const [createForm, setCreateForm] = useState<CreateUser>(DEFAULT_CREATE_USER);

  // Form data for edit
  const [editForm, setEditForm] = useState({
    name: editingUser?.name || '',
    phone: editingUser?.phone || '',
    bio: editingUser?.bio || '',
    role: editingUser?.role || USER_ROLES.OWNER,
  });

  const onEditSuccess = (): void => {
    onResetForm();
    void onRefetchUsers();
  };

  const onResetForm = (): void => {
    setEditingUser(null);
    setSelectedFile(null);
    setCreateForm(DEFAULT_CREATE_USER);
    setEditForm({
      name: '',
      phone: '',
      bio: '',
      role: USER_ROLES.OWNER,
    });
    setIsDialogOpen(false);
  };

  const {
    onCreateUser,
    isPending: isPendingCreate,
    error: createError,
  } = useCreateUserRequest({
    onSuccess: onEditSuccess,
  });

  const {
    onUpdateUser,
    isPending: isPendingUpdate,
    error: updateError,
  } = useUpdateUserRequest({
    onSuccess: onEditSuccess,
  });

  const isLoading = isPendingCreate || isPendingUpdate;
  const error = createError || updateError;

  const buttonText = editingUser ? 'Save Changes' : 'Create User';

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (editingUser) {
      onUpdateUser({
        user: {
          id: editingUser.id,
          email: editingUser.email,
          name: editForm.name,
          googleId: editingUser.googleId,
          role: editForm.role,
          isAdmin: editingUser.isAdmin,
          phone: editForm.phone,
          bio: editForm.bio,
        },
        photoFile: selectedFile,
      });
      return;
    }

    void onCreateUser(createForm);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
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
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md" onInteractOutside={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{editingUser ? 'Edit User' : 'New User'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {editingUser && (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={editingUser.photoUrl} alt={editingUser.name || 'User'} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {getInitials(editingUser.name || editingUser.email || 'User')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Click the icon to select a new photo{selectedFile ? ' (Photo selected)' : ''}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingUser ? editForm.name : createForm.name}
                  onChange={e =>
                    editingUser
                      ? setEditForm({ ...editForm, name: e.target.value })
                      : setCreateForm({ ...createForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled={!!editingUser}
                  value={editingUser ? editingUser.email : createForm.email}
                  onChange={e => setCreateForm({ ...createForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" type="role" disabled value={editingUser ? editingUser.role : createForm.role} />
                {editingUser && (
                  <p className="text-xs text-muted-foreground">
                    To change the user role, please contact the system administrator at{' '}
                    <a href="mailto:jagoqui.gomez@gmail.com" className="text-blue-600 underline">
                      jagoqui.gomez@gmail.com
                    </a>
                  </p>
                )}
              </div>
              {!editingUser && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="text" value="DEFAULT_PASSWORD" disabled required />
                </div>
              )}
              {editingUser && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+57 300 123 4567"
                      value={editForm.phone}
                      onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={editForm.bio}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setEditForm({ ...editForm, bio: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                </>
              )}
            </div>

            {error && <p className="text-sm text-red-600">Error: {error.message}</p>}

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" disabled={isLoading} onClick={onResetForm}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : buttonText}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
