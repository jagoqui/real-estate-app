import type { Property } from './property.model';

export interface FilesUpload {
  imagesFiles: Array<File>;
  coverImageFile: File;
}

export type CreatePropertyFormValues = Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'internalCode' | 'images'> &
  FilesUpload & {
    action: 'create';
  };

export type UpdatePropertyFormValues = Property &
  FilesUpload & {
    action: 'update';
  };

export type PropertyFormValues = CreatePropertyFormValues | UpdatePropertyFormValues;
