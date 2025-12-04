import type { UpdatePropertyCommand } from '@/modules/shared/application/commands/property.command';
import { urlsToFiles } from '@/modules/shared/domain/helpers/url-to-file/url-to-file.helper';
import { type Property } from '@/modules/shared/domain/models/property.model';
import { updatePropertyFormSchema } from '@/modules/shared/infrastructure/schemas/property-form.schema';

export const convertPropertyToFormData = async (property: Property): Promise<UpdatePropertyCommand> => {
  const imageUrls = [property.coverImage, ...property.images].filter((url): url is string => url !== null);
  const imagesFiles = await urlsToFiles(imageUrls);

  const formData: UpdatePropertyCommand = {
    ...property,
    coverImageFile: imagesFiles[0],
    imagesFiles: [...imagesFiles.slice(1)],
    action: 'update',
  };
  return updatePropertyFormSchema.parse(formData);
};
