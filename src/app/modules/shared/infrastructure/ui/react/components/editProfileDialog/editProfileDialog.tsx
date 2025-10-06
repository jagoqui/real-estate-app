import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { UpdateUser } from '@/modules/shared/domain/schemas/user.schema';
import { Camera, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';
import { fileToBase64Helper } from '../../helpers/fileToBase64/fileToBase64.helper';
import { useUpdateUserRequest } from '../../hooks/useUpdateUserRequest/useUpdateUserRequest';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// eslint-disable-next-line max-lines-per-function
export const EditProfileDialog = ({ open, onOpenChange }: EditProfileDialogProps): React.ReactElement => {
  const { authResponse } = useAuthResponseContext();
  const user = authResponse!.user;
  const [formData, setFormData] = useState(user);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadFileError, setUploadFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSuccess = (): void => {
    setFormData(user);
    setImageFile(null);
    setUploadFileError(null);
    setIsUploadingFile(false);
    onOpenChange(false);
  };

  const { isPending, onUpdateUser, error: updateUserError } = useUpdateUserRequest({ onSuccess });

  const isLoading = isUploadingFile || isPending;
  const error = updateUserError?.message || uploadFileError;

  const onSave = (user: UpdateUser): void => {
    const { photoUrl: _, ...rest } = authResponse!.user;

    const updatedUser: UpdateUser = {
      ...rest,
      ...user,
    };

    onUpdateUser({
      user: updatedUser,
      photoFile: imageFile,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setIsUploadingFile(true);

    try {
      const base64Url = await fileToBase64Helper(file);
      setFormData(prev => ({ ...prev, photoUrl: base64Url }));
    } catch (error) {
      console.error('Error during file preview:', error);
      setUploadFileError('Error al previsualizar la imagen.');
      setImageFile(null);
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const { photoUrl: _, ...rest } = formData;
    onSave(rest);
  };

  const INITIALS_LENGTH = 2;

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, INITIALS_LENGTH);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={formData.photoUrl} alt={formData.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(formData.name ?? 'User')}
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
                {isUploadingFile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  void handleFileChange(e);
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Click the icon to change your profile photo</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
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
                disabled
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+57 300 123 4567"
                value={formData.phone || ''}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" disabled={isLoading} onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
