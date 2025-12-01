import type { UpdateUser, User } from '@/modules/shared/domain/models/user.model';
import { useState } from 'react';
import { useAuthResponseContext } from '../../contexts/auth-response/auth-response.context';
import { fileToBase64Helper } from '../../helpers/file-to-base64/file-to-base64.helper';
import { useUpdateUserRequest } from '../use-update-user-request/use-update-user-request';

interface UseEditProfileDialogProps {
  onOpenChange: (open: boolean) => void;
}

interface UseEditProfileDialogReturn {
  formData: User;
  isLoading: boolean;
  error: string | null;
  isUploadingFile: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<UpdateUser>>;
}

export const useEditProfileDialog = ({ onOpenChange }: UseEditProfileDialogProps): UseEditProfileDialogReturn => {
  const { authResponse } = useAuthResponseContext();
  const user = authResponse!.user;
  const [formData, setFormData] = useState<User>(user);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadFileError, setUploadFileError] = useState<string | null>(null);

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
      setUploadFileError('Error previewing the image.');
      setImageFile(null);
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave(formData);
  };

  return {
    formData,
    handleSubmit,
    handleFileChange,
    isLoading,
    error,
    isUploadingFile,
    setFormData,
  };
};
